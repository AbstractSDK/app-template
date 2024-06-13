use crate::{
    error::{{adapter_name | upper_camel_case}}Error,
    handlers,
    msg::{
        {{adapter_name | upper_camel_case}}ExecuteMsg, {{adapter_name | upper_camel_case}}InstantiateMsg, {{adapter_name | upper_camel_case}}QueryMsg
    },
    ADAPTER_VERSION, {{adapter_name | shouty_snake_case}}_ID,
};

use abstract_adapter::AdapterContract;
use cosmwasm_std::Response;

/// The type of the adapter that is used to build your Adapter and access the Abstract SDK features.
pub type {{adapter_name | upper_camel_case}} = AdapterContract<
    {{adapter_name | upper_camel_case}}Error,
    {{adapter_name | upper_camel_case}}InstantiateMsg,
    {{adapter_name | upper_camel_case}}ExecuteMsg,
    {{adapter_name | upper_camel_case}}QueryMsg,
>;
/// The type of the result returned by your Adapter's entry points.
pub type AdapterResult<T = Response> = Result<T, {{adapter_name | upper_camel_case}}Error>;

const {{adapter_name | shouty_snake_case}}: {{adapter_name | upper_camel_case}} = {{adapter_name | upper_camel_case}}::new({{adapter_name | shouty_snake_case}}_ID, ADAPTER_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler);

// Export handlers
#[cfg(feature = "export")]
abstract_adapter::export_endpoints!({{adapter_name | shouty_snake_case}}, {{adapter_name | upper_camel_case}});

abstract_adapter::cw_orch_interface!(
    {{adapter_name | shouty_snake_case}},
    {{adapter_name | upper_camel_case}},
    {{adapter_name | upper_camel_case}}InstantiateMsg,
    {{adapter_name | upper_camel_case}}Interface
);
