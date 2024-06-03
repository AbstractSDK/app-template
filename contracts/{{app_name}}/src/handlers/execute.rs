use crate::{
    contract::{{{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result},
    msg::{{app_name | upper_camel_case}}ExecuteMsg,
    state::{CONFIG, COUNT},
};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, MessageInfo};

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    app: {{app_name | upper_camel_case}},
    msg: {{app_name | upper_camel_case}}ExecuteMsg,
) -> {{app_name | upper_camel_case}}Result {
    match msg {
        {{app_name | upper_camel_case}}ExecuteMsg::UpdateConfig {} => update_config(deps, info, app),
        {{app_name | upper_camel_case}}ExecuteMsg::Increment {} => increment(deps, app),
        {{app_name | upper_camel_case}}ExecuteMsg::Reset { count } => reset(deps, info, count, app),
    }
}

/// Update the configuration of the app
fn update_config(deps: DepsMut, msg_info: MessageInfo, app: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    // Only the admin should be able to call this
    app.admin.assert_admin(deps.as_ref(), &msg_info.sender)?;
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(app.response("update_config"))
}

fn increment(deps: DepsMut, app: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    COUNT.update(deps.storage, |count| {{app_name | upper_camel_case}}Result::Ok(count + 1))?;

    Ok(app.response("increment"))
}

fn reset(deps: DepsMut, info: MessageInfo, count: i32, app: {{app_name | upper_camel_case}}) -> {{app_name | upper_camel_case}}Result {
    app.admin.assert_admin(deps.as_ref(), &info.sender)?;
    COUNT.save(deps.storage, &count)?;

    Ok(app.response("reset"))
}
