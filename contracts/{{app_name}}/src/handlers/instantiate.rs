use crate::{
    contract::{
        {{app_name | upper_camel_case}}, {{app_name | upper_camel_case}}Result
    },
    msg::{{app_name | upper_camel_case}}InstantiateMsg,
    state::{Config, CONFIG, COUNT},
};

use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};

pub fn instantiate_handler(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _module: {{app_name | upper_camel_case}},
    msg: {{app_name | upper_camel_case}}InstantiateMsg,
) -> {{app_name | upper_camel_case}}Result {
    let config: Config = Config {};

    CONFIG.save(deps.storage, &config)?;
    COUNT.save(deps.storage, &msg.count)?;
    Ok(Response::new())
}
