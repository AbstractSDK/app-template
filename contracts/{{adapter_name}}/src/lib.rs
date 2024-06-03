pub mod api;
pub mod contract;
pub mod error;
mod handlers;
pub mod msg;
pub mod state;

pub use contract::interface::{{adapter_name | upper_camel_case}}Interface;
pub use error::{{adapter_name | upper_camel_case}}Error;
pub use msg::{
    {{adapter_name | upper_camel_case}}ExecuteMsg, {{adapter_name | upper_camel_case}}InstantiateMsg
};

/// The version of your Adapter
pub const ADAPTER_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const {{project_name | shouty_snake_case}}_NAMESPACE: &str = "{{project_name | kebab_case}}";
pub const {{adapter_name | shouty_snake_case}}_NAME: &str = "{{adapter_name | kebab_case}}";
