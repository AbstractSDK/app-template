use crate::adapter::MyAdapter;
use cosmwasm_schema::QueryResponses;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_adapter::adapter_msg_types!(MyAdapter, MyAdapterExecuteMsg, MyAdapterQueryMsg);

/// App instantiate message
#[cosmwasm_schema::cw_serde]
pub struct MyAdapterInstantiateMsg {}

/// App execute messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::ExecuteFns))]
#[cfg_attr(feature = "interface", impl_into(ExecuteMsg))]
pub enum MyAdapterExecuteMsg {
    /// Update the configuration of the adapter
    UpdateConfig {},
}

/// App query messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::QueryFns))]
#[cfg_attr(feature = "interface", impl_into(QueryMsg))]
#[derive(QueryResponses)]
pub enum MyAdapterQueryMsg {
    #[returns(ConfigResponse)]
    Config {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}
