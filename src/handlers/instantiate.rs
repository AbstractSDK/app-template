use abstract_core::objects::AssetEntry;
use abstract_sdk::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};

use crate::contract::{FeeCollectorApp, FeeCollectorResult};
use crate::msg::FeeCollectorInstantiateMsg;
// use crate::replies::INSTANTIATE_REPLY_ID;
use crate::state::{Config, CONFIG, ALLOWED_ASSETS};

pub fn instantiate_handler(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    app: FeeCollectorApp,
    msg: FeeCollectorInstantiateMsg,
) -> FeeCollectorResult {
    let FeeCollectorInstantiateMsg {
        max_swap_spread,
        commission_addr,
        fee_asset,
        dex,
    } = msg;

    let commission_addr = deps.api.addr_validate(&commission_addr)?;
    let fee_asset = AssetEntry::from(fee_asset);

    let config: Config = Config {
        commission_addr,
        max_swap_spread,
        fee_asset,
        dex,
    };

    CONFIG.save(deps.storage, &config)?;
    ALLOWED_ASSETS.save(deps.storage, &vec![])?;

    Ok(app.custom_tag_response(
        Response::new(),
        "instantiate",
        vec![("4t2", "/FC/instantiate")],
    ))
}
