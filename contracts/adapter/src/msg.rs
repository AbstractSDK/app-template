use crate::contract::MyAdapter;

use abstract_adapter::objects::AccountId;
use cosmwasm_schema::QueryResponses;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_adapter::adapter_msg_types!(MyAdapter, MyAdapterExecuteMsg, MyAdapterQueryMsg);

/// Adapter instantiate message
#[cosmwasm_schema::cw_serde]
pub struct MyAdapterInstantiateMsg {}

/// Adapter execute messages
#[cosmwasm_schema::cw_serde]
#[derive(cw_orch::ExecuteFns)]
#[impl_into(ExecuteMsg)]
pub enum MyAdapterExecuteMsg {
    /// Set status of your account
    SetStatus { status: String },
    /// Admin method: Update the configuration of the adapter
    UpdateConfig {},
}

/// Adapter query messages
#[cosmwasm_schema::cw_serde]
#[derive(QueryResponses, cw_orch::QueryFns)]
#[impl_into(QueryMsg)]
pub enum MyAdapterQueryMsg {
    #[returns(StatusResponse)]
    Status { account_id: AccountId },
    #[returns(ConfigResponse)]
    Config {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}

#[cosmwasm_schema::cw_serde]
pub struct StatusResponse {
    pub status: Option<String>,
}
