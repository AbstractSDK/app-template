use crate::msg::*;
use abstract_boot::AppDeployer;
use abstract_core::app::MigrateMsg;
use boot_core::{contract, Contract, CwEnv};

#[contract(InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg)]
pub struct FeeCollector<Chain>;

impl<Chain: CwEnv> AppDeployer<Chain> for FeeCollector<Chain> {}

impl<Chain: CwEnv> FeeCollector<Chain> {
    pub fn new(name: &str, chain: Chain) -> Self {
        let contract = Contract::new(name, chain).with_wasm_path("fee_collector_app");

        #[cfg(feature = "integration")]
        contract.set_mock(Box::new(
            ContractWrapper::new_with_empty(
                crate::contract::execute,
                crate::contract::instantiate,
                crate::contract::query,
            )
            .with_reply(crate::contract::reply),
        ));
        Self(contract)
    }
}
