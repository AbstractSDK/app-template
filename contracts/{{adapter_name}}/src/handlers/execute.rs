use crate::{
    contract::{
        AdapterResult, {{adapter_name | upper_camel_case}}
    },
    msg::{{adapter_name | upper_camel_case}}ExecuteMsg,
    state::{CONFIG, STATUS},
    {{adapter_name | upper_camel_case}}Error, {{project-name | shouty_snake_case}}_NAMESPACE,
};

use abstract_adapter::{
    objects::namespace::Namespace,
    sdk::{AccountVerification, ModuleRegistryInterface},
    traits::AbstractResponse,
};
use cosmwasm_std::{ensure_eq, DepsMut, Env, MessageInfo};

pub fn execute_handler(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    module: {{adapter_name | upper_camel_case}},
    msg: {{adapter_name | upper_camel_case}}ExecuteMsg,
) -> AdapterResult {
    match msg {
        {{adapter_name | upper_camel_case}}ExecuteMsg::UpdateConfig {} => update_config(deps, info, module),
        {{adapter_name | upper_camel_case}}ExecuteMsg::SetStatus { status } => set_status(deps, module, status),
    }
}

/// Update the configuration of the adapter
fn update_config(deps: DepsMut, _msg_info: MessageInfo, module: {{adapter_name | upper_camel_case}}) -> AdapterResult {
    // Only admin(namespace owner) can change recipient address
    let namespace = module
        .module_registry(deps.as_ref())?
        .query_namespace(Namespace::new({{project-name | shouty_snake_case}}_NAMESPACE)?)?;

    // unwrap namespace, since it's unlikely to have unclaimed namespace as this adapter installed
    let namespace_info = namespace.unwrap();
    ensure_eq!(
        namespace_info.account_base,
        module.target_account.clone().unwrap(),
        {{adapter_name | upper_camel_case}}Error::Unauthorized {}
    );
    let mut _config = CONFIG.load(deps.storage)?;

    Ok(module.response("update_config"))
}

fn set_status(deps: DepsMut, module: {{adapter_name | upper_camel_case}}, status: String) -> AdapterResult {
    let account_registry = module.account_registry(deps.as_ref())?;

    let account_id = account_registry.account_id(module.target()?)?;
    STATUS.save(deps.storage, &account_id, &status)?;

    Ok(module
        .response("set_status")
        .add_attribute("new_status", &status)
        .add_attribute("account_id", account_id.to_string()))
}
