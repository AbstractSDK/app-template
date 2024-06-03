use crate::{
    contract::{MyApp, MyAppResult},
    msg::MyAppExecuteMsg,
    state::{CONFIG, COUNT},
};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    app: MyApp,
    msg: MyAppExecuteMsg,
) -> MyAppResult {
    match msg {
        MyAppExecuteMsg::UpdateConfig {} => update_config(deps, info, app),
        MyAppExecuteMsg::Increment {} => increment(deps, app),
        MyAppExecuteMsg::Reset { count } => reset(deps, info, count, app),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, msg_info: MessageInfo, app: MyApp) -> MyAppResult {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(app.response("update_config"))
}

fn increment(deps: DepsMut, app: MyApp) -> MyAppResult {
    COUNT.update(deps.storage, |count| MyAppResult::Ok(count + 1))?;

    Ok(app.response("increment"))
}

fn reset(deps: DepsMut, info: MessageInfo, count: i32, app: MyApp) -> MyAppResult {
    app.admin.assert_admin(deps.as_ref(), &info.sender)?;
    COUNT.save(deps.storage, &count)?;

    Ok(app.response("reset"))
}
