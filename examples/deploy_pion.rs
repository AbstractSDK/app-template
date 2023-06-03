use cosmwasm_std::Empty;
use cw_orch::{
    anyhow,
    prelude::{networks::parse_network, DaemonBuilder},
    tokio::runtime::Runtime, deploy::Deploy,
};

use abstract_interface::{AppDeployer, Abstract};
use app::{contract::APP_ID, interface::App};
use semver::Version;

use crate::neutron::LOCAL_NEUTRON;

// start:   `make start-docker-container`
// stop:    `make stop-docker-container`
const MNEMONIC: &str = "clock post desk civil pottery foster expand merit dash seminar song memory figure uniform spice circle try happy obvious trash crime hybrid hood cushion";

const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

fn main() -> anyhow::Result<()> {
    dotenv().ok();
    env_logger::init();
    use dotenv::dotenv;

    let version: Version = CONTRACT_VERSION.parse().unwrap();
    let rt = Runtime::new()?;
    let chain = DaemonBuilder::default()
        .chain(LOCAL_NEUTRON)
        .handle(rt.handle())
        .mnemonic(MNEMONIC)
        .build()?;
    let _abstr = Abstract::deploy_on(chain.clone(), Empty {})?;
    
    let app = App::new(APP_ID, chain);

    app.deploy(version)?;
    Ok(())
}


mod neutron {
    use cw_orch::{daemon::{ChainInfo, ChainKind}, prelude::networks::neutron::NEUTRON_NETWORK};

    /// <https://github.com/cosmos/chain-registry/blob/master/neutron/chain.json>
    pub const LOCAL_NEUTRON: ChainInfo = ChainInfo {
        kind: ChainKind::Mainnet,
        chain_id: "test-1",
        gas_denom: "untrn",
        gas_price: 0.0025,
        grpc_urls: &["http://localhost:8090"],
        network_info: NEUTRON_NETWORK,
        lcd_url: None,
        fcd_url: None,
    };

}