use abstract_adapter::sdk::AbstractSdkError;
use abstract_adapter::std::AbstractError;
use abstract_adapter::AdapterError as AbstractAdapterError;
use cosmwasm_std::StdError;
use cw_asset::AssetError;
use cw_controllers::AdminError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum MyAdapterError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("{0}")]
    Abstract(#[from] AbstractError),

    #[error("{0}")]
    AbstractSdk(#[from] AbstractSdkError),

    #[error("{0}")]
    Asset(#[from] AssetError),

    #[error("{0}")]
    Admin(#[from] AdminError),

    #[error("{0}")]
    AdapterError(#[from] AbstractAdapterError),

    #[error("{0} are not implemented")]
    NotImplemented(String),
}
