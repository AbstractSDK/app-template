use crate::adapter::error::MyAdapterError;
use crate::adapter::msg::{MyAdapterExecuteMsg, MyAdapterInstantiateMsg, MyAdapterQueryMsg};
use abstract_adapter::AdapterContract;

pub mod error;
pub mod msg;
pub mod state;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type MyAdapter = AdapterContract<
    MyAdapterError,
    MyAdapterInstantiateMsg,
    MyAdapterExecuteMsg,
    MyAdapterQueryMsg,
>;
