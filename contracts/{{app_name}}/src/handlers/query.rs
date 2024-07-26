use crate::{
    contract::{
        {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
    },
    msg::{ConfigResponse, CountResponse, {{app_name | upper_camel_case}}QueryMsg},
    state::{CONFIG, COUNT},
};

use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdResult};

pub fn query_handler(
    deps: Deps,
    _env: Env,
    _module: &{{app_name | upper_camel_case}},
    msg: {{app_name | upper_camel_case}}QueryMsg,
) -> {{app_name | upper_camel_case}}Result<Binary> {
    match msg {
        {{app_name | upper_camel_case}}QueryMsg::Config {} => to_json_binary(&query_config(deps)?),
        {{app_name | upper_camel_case}}QueryMsg::Count {} => to_json_binary(&query_count(deps)?),
    }
    .map_err(Into::into)
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let _config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse {})
}

fn query_count(deps: Deps) -> StdResult<CountResponse> {
    let count = COUNT.load(deps.storage)?;
    Ok(CountResponse { count })
}
