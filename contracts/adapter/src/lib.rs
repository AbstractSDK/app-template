pub mod contract;
mod handlers;

#[cfg(feature = "interface")]
pub use contract::interface::MyAdapterInterface;
#[cfg(feature = "interface")]
pub use my_package::adapter::msg::{MyAdapterExecuteMsgFns, MyAdapterQueryMsgFns};

/// The version of your app
pub const ADAPTER_VERSION: &str = env!("CARGO_PKG_VERSION");

pub use my_package::adapter::error;
pub use my_package::adapter::msg;
pub use my_package::adapter::state;
pub use my_package::adapter::MyAdapter as Adapter;
