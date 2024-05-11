use cosmwasm_schema::QueryResponses;

use crate::app::MyApp;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_app::app_msg_types!(MyApp, MyAppExecuteMsg, MyAppQueryMsg);

/// App instantiate message
#[cosmwasm_schema::cw_serde]
pub struct MyAppInstantiateMsg {}

/// App execute messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::ExecuteFns))]
#[cfg_attr(feature = "interface", impl_into(ExecuteMsg))]
pub enum MyAppExecuteMsg {
    /// Receive a message from the adapter
    UpdateConfig {},
}

#[cosmwasm_schema::cw_serde]
pub struct MyAppMigrateMsg {}

/// App query messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(cw_orch::QueryFns))]
#[cfg_attr(feature = "interface", impl_into(QueryMsg))]
#[derive(QueryResponses)]
pub enum MyAppQueryMsg {
    #[returns(ConfigResponse)]
    Config {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}
