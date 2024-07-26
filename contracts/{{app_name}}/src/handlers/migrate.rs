use crate::{
    contract::{
        {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
    },
    msg::{{app_name | upper_camel_case}}MigrateMsg,
};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env};

/// Handle the app migrate msg
/// The top-level Abstract app does version checking and dispatches to this handler
pub fn migrate_handler(
    _deps: DepsMut,
    _env: Env,
    module: {{app_name | upper_camel_case}},
    _msg: {{app_name | upper_camel_case}}MigrateMsg,
) -> {{app_name | upper_camel_case}}Result {
    Ok(module.response("migrate"))
}
