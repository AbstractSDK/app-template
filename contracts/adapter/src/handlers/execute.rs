use crate::{
    contract::{AppResult, MyAdapter},
    msg::MyAdapterExecuteMsg,
    state::CONFIG,
};

use abstract_adapter::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    adapter: MyAdapter,
    msg: MyAdapterExecuteMsg,
) -> AppResult {
    match msg {
        MyAdapterExecuteMsg::UpdateConfig {} => update_config(deps, info, adapter),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, _msg_info: MessageInfo, adapter: MyAdapter) -> AppResult {
    // Only the admin should be able to call this
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(adapter.response("update_config"))
}
