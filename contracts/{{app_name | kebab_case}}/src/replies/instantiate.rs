use crate::contract::{
    {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}
}Result};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, Reply};

pub fn instantiate_reply(_deps: DepsMut, _env: Env, app: {{app_name | upper_camel_case}}, _reply: Reply) -> {{app_name | upper_camel_case}}Result {
    Ok(app.response("instantiate_reply"))
}
