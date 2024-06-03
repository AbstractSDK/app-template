pub mod contract;
pub mod error;
mod handlers;
pub mod msg;
mod replies;
pub mod state;

pub use error::{{app_name | upper_camel_case}}Error;

/// The version of your app
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

pub use contract::interface::{{app_name | upper_camel_case}}Interface;

pub const {{project_name | shouty_snake_case}}_NAMESPACE: &str = "{{project_name}}";
pub const {{app_name | shouty_snake_case}}_NAME: &str = "my-app";
pub const {{app_name | shouty_snake_case}}_ID: &str = const_format::formatcp!("{{{project_name | shouty_snake_case}}_NAMESPACE}:{{{app_name | shouty_snake_case}}_NAME}");
