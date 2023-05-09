use abstract_dex_api::api::DexInterface;
use abstract_sdk::{
    core::objects::{AnsAsset, AssetEntry},
    features::AbstractResponse,
    AbstractSdkResult, TransferInterface,
};

use cosmwasm_std::{Decimal, DepsMut, Env, MessageInfo, Response, SubMsg};

use crate::{
    contract::{FeeCollectorApp, FeeCollectorResult},
    replies::SWAPPED_REPLY_ID,
    state::ALLOWED_ASSETS,
};

use crate::msg::FeeCollectorExecuteMsg;
use crate::state::CONFIG;

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    app: FeeCollectorApp,
    msg: FeeCollectorExecuteMsg,
) -> FeeCollectorResult {
    match msg {
        FeeCollectorExecuteMsg::UpdateConfig {
            commission_addr,
            fee_asset,
            dex,
            max_swap_spread,
        } => update_config(
            deps,
            info,
            app,
            commission_addr,
            fee_asset,
            dex,
            max_swap_spread,
        ),
        FeeCollectorExecuteMsg::Collect {} => collect(deps, info, app),
        FeeCollectorExecuteMsg::AddAllowedAssets { assets } => {
            add_allowed_assets(deps, info, app, assets)
        }
    }
}

/// Update the configuration of the app
fn update_config(
    deps: DepsMut,
    msg_info: MessageInfo,
    app: FeeCollectorApp,
    commission_addr: Option<String>,
    fee_asset: Option<String>,
    dex: Option<String>,
    max_swap_spread: Option<Decimal>,
) -> FeeCollectorResult {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let mut config = CONFIG.load(deps.storage)?;

    if let Some(addr) = commission_addr {
        let commission_addr = deps.api.addr_validate(&addr)?;
        config.commission_addr = commission_addr;
    }

    if let Some(spread) = max_swap_spread {
        config.max_swap_spread = spread;
    }

    if let Some(fee_asset) = fee_asset {
        let fee_asset = AssetEntry::from(fee_asset);
        config.fee_asset = fee_asset;
    }

    if let Some(dex) = dex {
        config.dex = dex;
    }

    CONFIG.save(deps.storage, &config)?;

    Ok(app.tag_response(Response::default(), "update_config"))
}

/// Add allowed assets
fn add_allowed_assets(
    deps: DepsMut,
    msg_info: MessageInfo,
    app: FeeCollectorApp,
    assets: Vec<AssetEntry>,
) -> FeeCollectorResult {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let mut supported_assets = ALLOWED_ASSETS.load(deps.storage)?;
    let config = CONFIG.load(deps.storage)?;

    for asset in assets {
        if asset == config.fee_asset {
            return Err(crate::error::FeeCollectorError::FeeAssetNotAllowed {});
        }

        if !supported_assets.contains(&asset) {
            supported_assets.push(asset);
        }
    }
    supported_assets.sort();
    ALLOWED_ASSETS.save(deps.storage, &supported_assets)?;

    Ok(app.tag_response(Response::default(), "add_allowed_assets"))
}

fn collect(deps: DepsMut, msg_info: MessageInfo, app: FeeCollectorApp) -> FeeCollectorResult {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let config = CONFIG.load(deps.storage)?;

    // query all balances
    let supported_assets = ALLOWED_ASSETS.load(deps.storage)?;
    let balances = app.bank(deps.as_ref()).balances(&supported_assets)?;
    let swap_assets = balances
        .iter()
        .enumerate()
        .map(|(i, b)| {
            let asset = &supported_assets[i];
            let balance = b.amount;
            let ans_asset = AnsAsset::new(asset.clone(), balance);
            Ok(ans_asset)
        })
        .collect::<FeeCollectorResult<Vec<AnsAsset>>>()?;

    // swap all non-lp balances to fee asset
    let dex = app.dex(deps.as_ref(), config.dex);
    let mut swap_msgs = vec![];
    swap_assets
        .into_iter()
        .try_for_each(|asset| -> AbstractSdkResult<_> {
            let swap_msg = dex.swap(
                asset,
                config.fee_asset.clone(),
                Some(config.max_swap_spread),
                None,
            )?;
            swap_msgs.push(swap_msg);
            Ok(())
        })?;
    // add reply to the last swap
    let last_swap_submsg = SubMsg::reply_on_success(swap_msgs.pop().unwrap(), SWAPPED_REPLY_ID);

    // send all funds to commission address
    let response = Response::new()
        .add_messages(swap_msgs)
        .add_submessage(last_swap_submsg);

    Ok(app.custom_tag_response(response, "collect", vec![("4t2", "/FC/Collect")]))
}
