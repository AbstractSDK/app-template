use abstract_app::{sdk::AbstractResponse, std::ibc::ModuleIbcInfo};
use cosmwasm_std::{ensure, ensure_eq, from_json, Binary, DepsMut, Env, Response};

use crate::{
    contract::{App, AppResult},
    error::AppError,
    msg::{PingOrPong, PingPongIbcMsg},
    state::LOSSES,
};

pub fn receive_module_ibc(
    deps: DepsMut,
    env: Env,
    module: App,
    source_module: ModuleIbcInfo,
    msg: Binary,
) -> AppResult<Response> {
    let msg: IbcMsg = from_json(&msg)?;
    // do something with received msg
    Ok(resp)
}
