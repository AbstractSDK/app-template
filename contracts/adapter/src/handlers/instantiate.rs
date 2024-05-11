use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};

use crate::contract::{Adapter, AppResult};
use crate::state::{Config, CONFIG};
use my_package::adapter::msg::MyAdapterInstantiateMsg;

pub fn instantiate_handler(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _app: Adapter,
    _msg: MyAdapterInstantiateMsg,
) -> AppResult {
    let config: Config = Config {};

    CONFIG.save(deps.storage, &config)?;

    // Example instantiation that doesn't do anything
    Ok(Response::new())
}
