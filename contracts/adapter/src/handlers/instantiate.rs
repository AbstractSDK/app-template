use crate::{
    contract::{AdapterResult, MyAdapter},
    msg::MyAdapterInstantiateMsg,
    state::{Config, CONFIG},
};

use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};

pub fn instantiate_handler(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _adapter: MyAdapter,
    _msg: MyAdapterInstantiateMsg,
) -> AdapterResult {
    let config: Config = Config {};

    CONFIG.save(deps.storage, &config)?;

    // Example instantiation that doesn't do anything
    Ok(Response::new())
}
