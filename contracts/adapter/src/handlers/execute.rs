use abstract_adapter::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

use my_package::adapter::msg::MyAdapterExecuteMsg;

use crate::contract::{Adapter, AppResult};
use crate::state::CONFIG;

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    app: Adapter,
    msg: MyAdapterExecuteMsg,
) -> AppResult {
    match msg {
        MyAdapterExecuteMsg::UpdateConfig {} => update_config(deps, info, app),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, _msg_info: MessageInfo, app: Adapter) -> AppResult {
    // Only the admin should be able to call this
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(app.response("update_config"))
}
