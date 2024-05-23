use crate::{
    contract::{AdapterResult, MyAdapter},
    msg::{ConfigResponse, MyAdapterQueryMsg, StatusResponse},
    state::{CONFIG, STATUS},
};

use abstract_adapter::objects::AccountId;
use cosmwasm_std::{to_json_binary, Binary, Deps, Env, StdResult};

pub fn query_handler(
    deps: Deps,
    _env: Env,
    _adapter: &MyAdapter,
    msg: MyAdapterQueryMsg,
) -> AdapterResult<Binary> {
    match msg {
        MyAdapterQueryMsg::Config {} => to_json_binary(&query_config(deps)?),
        MyAdapterQueryMsg::Status { account_id } => {
            to_json_binary(&query_status(deps, account_id)?)
        }
    }
    .map_err(Into::into)
}

fn query_config(deps: Deps) -> StdResult<ConfigResponse> {
    let _config = CONFIG.load(deps.storage)?;
    Ok(ConfigResponse {})
}

fn query_status(deps: Deps, account_id: AccountId) -> StdResult<StatusResponse> {
    let status = STATUS.may_load(deps.storage, &account_id)?;
    Ok(StatusResponse { status })
}
