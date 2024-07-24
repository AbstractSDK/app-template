pub mod contract;
pub mod error;
pub mod msg;
pub mod state;

use abstract_standalone::StandaloneContract;
use cosmwasm_std::Response;
pub use error::{{standalone_name | upper_camel_case}}Error;

/// The version of your standalone
pub const STANDALONE_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const {{project-name | shouty_snake_case}}_NAMESPACE: &str = "{{project-name}}";
pub const {{standalone_name | shouty_snake_case}}_NAME: &str = "{{standalone_name | kebab_case}}";
pub const {{standalone_name | shouty_snake_case}}_ID: &str = const_format::concatcp!({{project-name | shouty_snake_case}}_NAMESPACE, ":", {{standalone_name | shouty_snake_case}}_NAME);

/// The type of the result returned by your standalone's entry points.
pub type {{standalone_name | upper_camel_case}}Result<T = Response> = Result<T, {{standalone_name | upper_camel_case}}Error>;

/// The type of the standalone that is used to build your contract object and access the Abstract SDK features.
pub type {{standalone_name | upper_camel_case}} = StandaloneContract;

pub const {{standalone_name | shouty_snake_case}}: {{standalone_name | upper_camel_case}} =
    {{standalone_name | upper_camel_case}}::new({{standalone_name | shouty_snake_case}}_ID, STANDALONE_VERSION, None);

// cw-orch related interface
#[cfg(not(target_arch = "wasm32"))]
mod interface;

#[cfg(not(target_arch = "wasm32"))]
pub use interface::{{standalone_name | upper_camel_case}}Interface;
