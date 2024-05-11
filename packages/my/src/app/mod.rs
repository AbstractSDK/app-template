use crate::app::error::ClientError;
use crate::app::msg::{MyAppExecuteMsg, MyAppInstantiateMsg, MyAppMigrateMsg, MyAppQueryMsg};
use abstract_app::AppContract;

pub mod error;
pub mod msg;
pub mod state;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type MyApp =
    AppContract<ClientError, MyAppInstantiateMsg, MyAppExecuteMsg, MyAppQueryMsg, MyAppMigrateMsg>;
