use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

use crate::contract::{App, MyAppResult};
use crate::msg::MyAppExecuteMsg;
use crate::state::CONFIG;

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    app: App,
    msg: MyAppExecuteMsg,
) -> MyAppResult {
    match msg {
        MyAppExecuteMsg::UpdateConfig {} => update_config(deps, info, app),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, msg_info: MessageInfo, app: App) -> MyAppResult {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(app.response("update_config"))
}
