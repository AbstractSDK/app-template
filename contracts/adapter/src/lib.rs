pub mod api;
pub mod contract;
pub mod error;
mod handlers;
pub mod msg;
pub mod state;

pub use contract::interface::MyAdapterInterface;
pub use error::MyAdapterError;
pub use msg::{MyAdapterExecuteMsg, MyAdapterInstantiateMsg};

/// The version of your Adapter
pub const ADAPTER_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const MY_NAMESPACE: &str = "yournamespace";
pub const MY_ADAPTER_NAME: &str = "my-adapter";
pub const MY_ADAPTER_ID: &str = const_format::formatcp!("{MY_NAMESPACE}:{MY_ADAPTER_NAME}");
