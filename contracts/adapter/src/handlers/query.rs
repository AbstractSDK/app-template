use crate::{
    contract::{AppResult, MyAdapter},
    msg::{ConfigResponse, MyAdapterQueryMsg},
    state::CONFIG,
};

use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdResult};

pub fn query_handler(
    deps: Deps,
    _env: Env,
    _adapter: &MyAdapter,
    msg: MyAdapterQueryMsg,
) -> AppResult<Binary> {
    match msg {
        MyAdapterQueryMsg::Config {} => to_json_binary(&query_config(deps)?),
    }
    .map_err(Into::into)
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let _config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse {})
}
