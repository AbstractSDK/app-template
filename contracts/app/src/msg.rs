use crate::contract::MyApp;

use cosmwasm_schema::QueryResponses;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_app::app_msg_types!(MyApp, MyAppExecuteMsg, MyAppQueryMsg);

/// App instantiate message
#[cosmwasm_schema::cw_serde]
pub struct MyAppInstantiateMsg {}

/// App execute messages
#[cosmwasm_schema::cw_serde]
#[derive(cw_orch::ExecuteFns)]
#[impl_into(ExecuteMsg)]
pub enum MyAppExecuteMsg {
    /// Receive a message from the adapter
    UpdateConfig {},
}

#[cosmwasm_schema::cw_serde]
pub struct MyAppMigrateMsg {}

/// App query messages
#[cosmwasm_schema::cw_serde]
#[derive(QueryResponses, cw_orch::QueryFns)]
#[impl_into(QueryMsg)]
pub enum MyAppQueryMsg {
    #[returns(ConfigResponse)]
    Config {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}
