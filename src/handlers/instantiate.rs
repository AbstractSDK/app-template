use abstract_core::objects::AssetEntry;
use cosmwasm_std::{wasm_execute, DepsMut, Env, MessageInfo, Response, SubMsg};

use crate::contract::{FeeCollectorApp, FeeCollectorResult};
use crate::msg::FeeCollectorInstantiateMsg;
use crate::replies::INSTANTIATE_REPLY_ID;
use crate::state::{Config, CONFIG};

pub fn instantiate_handler(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _app: FeeCollectorApp,
    _msg: FeeCollectorInstantiateMsg,
) -> FeeCollectorResult {
    let FeeCollectorInstantiateMsg { max_swap_spread, commission_addr , fee_asset, dex } = _msg;
    let commission_addr = deps.api.addr_validate(&commission_addr)?;

    let fee_asset = AssetEntry::from(fee_asset);
    let config: Config = Config { commission_addr: commission_addr, max_swap_spread: max_swap_spread , fee_asset: fee_asset, dex: dex};

    CONFIG.save(deps.storage, &config)?;

    // Example reply that doesn't do anything
    Ok(Response::new().add_submessage(SubMsg::reply_on_success(
        wasm_execute(_env.contract.address, &cosmwasm_std::Empty {}, vec![])?,
        INSTANTIATE_REPLY_ID,
    )))
}
