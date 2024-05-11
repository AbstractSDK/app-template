pub mod contract;
mod handlers;
mod replies;

/// The version of your app
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(feature = "interface")]
pub use contract::interface::MyAppInterface;
#[cfg(feature = "interface")]
pub use my_package::app::msg::{MyAppExecuteMsgFns, MyAppQueryMsgFns};

pub use my_package::app::error;
pub use my_package::app::msg;
pub use my_package::app::state;
