use abstract_app::{
    objects::TruncatedChainId,
    sdk::AbstractResponse,
    std::ibc::{Callback, IbcResult},
};
use cosmwasm_std::{from_json, DepsMut, Env};

use crate::{
    contract::{App, AppResult},
    handlers::execute::ping_pong,
    msg::{BlockHeightResponse, IbcCallbackMsg},
    state::{LOSSES, WINS},
};

pub fn ibc_callback(
    deps: DepsMut,
    env: Env,
    module: App,
    callback: Callback,
    result: IbcResult,
) -> AppResult {
    Ok(module.response("callback"))
}