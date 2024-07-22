use crate::contract::{{adapter_name | upper_camel_case}};

use abstract_adapter::objects::AccountId;
use cosmwasm_schema::QueryResponses;

// This is used for type safety and re-exporting the contract endpoint structs.
abstract_adapter::adapter_msg_types!({{adapter_name | upper_camel_case}}, {{adapter_name | upper_camel_case}}ExecuteMsg, {{adapter_name | upper_camel_case}}QueryMsg);

/// Adapter instantiate message
#[cosmwasm_schema::cw_serde]
pub struct {{adapter_name | upper_camel_case}}InstantiateMsg {}

/// Adapter execute messages
#[cosmwasm_schema::cw_serde]
pub enum {{adapter_name | upper_camel_case}}ExecuteMsg {
    /// Set status of your account
    SetStatus { status: String },
    /// Admin method: Update the configuration of the adapter
    UpdateConfig {},
}

/// Adapter query messages
#[cosmwasm_schema::cw_serde]
#[derive(QueryResponses, cw_orch::QueryFns)]
pub enum {{adapter_name | upper_camel_case}}QueryMsg {
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
