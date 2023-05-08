//! # Liquidity Interface Add-On
//!
//! `crate::msg` is an app which allows users to deposit into or withdraw from a [`crate::proxy`] contract.
//!
//! ## Description
//! This contract uses the proxy's value calculation configuration to get the value of the assets held in the proxy and the relative value of the deposit asset.
//! It then mints LP tokens that are claimable for an equal portion of the proxy assets at a later date.
//!
//! ---
//! **WARNING:** This mint/burn mechanism can be mis-used by flash-loan attacks if the assets contained are of low-liquidity compared to the etf's size.
//!
//! ## Creation
//! The etf contract can be added on an OS by calling [`ExecuteMsg::InstallModule`](crate::manager::ExecuteMsg::InstallModule) on the manager of the os.
//! ```ignore
//! let etf_init_msg = InstantiateMsg{
//!                deposit_asset: "juno".to_string(),
//!                base: BaseInstantiateMsg{ans_host_address: "juno1...".to_string()},
//!                fee: Decimal::percent(10),
//!                manager_addr: "juno1...".to_string(),
//!                token_code_id: 3,
//!                etf_lp_token_name: Some("demo_etf".to_string()),
//!                etf_lp_token_symbol: Some("DEMO".to_string()),
//!        };
//! let create_module_msg = ExecuteMsg::InstallModule {
//!                 module: Module {
//!                     info: ModuleInfo {
//!                         name: ETF.into(),
//!                         version: None,
//!                     },
//!                     kind: crate::core::modules::ModuleKind::External,
//!                 },
//!                 init_msg: Some(to_binary(&etf_init_msg).unwrap()),
//!        };
//! // Call create_module_msg on manager
//! ```
//!
//! ## Migration
//! Migrating this contract is done by calling `ExecuteMsg::Upgrade` on [`crate::manager`] with `crate::ETF` as module.
use abstract_core::app;
use abstract_sdk::base::{ExecuteEndpoint, InstantiateEndpoint, MigrateEndpoint, QueryEndpoint};
use cosmwasm_schema::QueryResponses;
use cosmwasm_std::Decimal;

use crate::contract::FeeCollectorApp;

/// Abstract App instantiate msg
pub type InstantiateMsg = <FeeCollectorApp as InstantiateEndpoint>::InstantiateMsg;
pub type ExecuteMsg = <FeeCollectorApp as ExecuteEndpoint>::ExecuteMsg;
pub type QueryMsg = <FeeCollectorApp as QueryEndpoint>::QueryMsg;
pub type MigrateMsg = <FeeCollectorApp as MigrateEndpoint>::MigrateMsg;

impl app::AppExecuteMsg for FeeCollectorExecuteMsg {}
impl app::AppQueryMsg for FeeCollectorQueryMsg {}

/// FeeCollector instantiate message
#[cosmwasm_schema::cw_serde]
pub struct FeeCollectorInstantiateMsg {
    pub max_swap_spread: Decimal,
    pub commission_addr: String,
    pub fee_asset: String,
    pub dex: String,
}

/// FeeCollector execute messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(boot_core::ExecuteFns))]
#[cfg_attr(feature = "interface", impl_into(ExecuteMsg))]
pub enum FeeCollectorExecuteMsg {
    // TODO: add attrs to update
    UpdateConfig {max_swap_spread: Option<Decimal>, commission_addr: Option<String>, fee_asset: Option<String>, dex: Option<String>},
    Collect {},
}

/// FeeCollector query messages
#[cosmwasm_schema::cw_serde]
#[cfg_attr(feature = "interface", derive(boot_core::QueryFns))]
#[cfg_attr(feature = "interface", impl_into(QueryMsg))]
#[derive(QueryResponses)]
pub enum FeeCollectorQueryMsg {
    /// Query the configuration
    /// Returns [`ConfigResponse`]
    #[returns(ConfigResponse)]
    Config {},
}

/// FeeCollector migrate msg
#[cosmwasm_schema::cw_serde]
pub enum FeeCollectorMigrateMsg {}

#[cosmwasm_schema::cw_serde]
pub enum Cw20HookMsg {
    Deposit {},
}

#[cosmwasm_schema::cw_serde]
pub struct ConfigResponse {}
