//! Deploys Abstract and the Adapter module to a local Junod instance. See how to spin up a local chain here: https://docs.junonetwork.io/developer-guides/junod-local-dev-setup
//! You can also start a juno container by running `just juno-local`.
//!
//! Ensure the local juno is running before executing this script.
//! Also make sure port 9090 is exposed on the local juno container. This port is used to communicate with the chain.
//!
//! # Run
//!
//! `RUST_LOG=info cargo run --example local_daemon --package my-adapter`
use my_adapter::{contract::interface::MyAdapterInterface, MyAdapterExecuteMsg, MY_ADAPTER_ID};

use abstract_adapter::{objects::namespace::Namespace, std::adapter::AdapterRequestMsg};
use abstract_client::{AbstractClient, Publisher};
use cw_orch::{anyhow, prelude::*, tokio::runtime::Runtime};
use my_adapter::{msg::MyAdapterInstantiateMsg, ADAPTER_VERSION};
use semver::Version;

const LOCAL_MNEMONIC: &str = "clip hire initial neck maid actor venue client foam budget lock catalog sweet steak waste crater broccoli pipe steak sister coyote moment obvious choose";

fn main() -> anyhow::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    let _version: Version = ADAPTER_VERSION.parse().unwrap();
    let runtime = Runtime::new()?;

    let daemon = Daemon::builder()
        .chain(networks::LOCAL_JUNO)
        .mnemonic(LOCAL_MNEMONIC)
        .handle(runtime.handle())
        .build()
        .unwrap();

    let adapter_namespace = Namespace::from_id(MY_ADAPTER_ID)?;

    // Create an [`AbstractClient`]
    // Note: AbstractClient Builder used because Abstract is not yet deployed on the chain
    let abstract_client: AbstractClient<Daemon> =
        AbstractClient::builder(daemon.clone()).build()?;

    // Get the [`Publisher`] that owns the namespace.
    // If there isn't one, it creates an Account and claims the namespace.
    let publisher: Publisher<_> = abstract_client
        .publisher_builder(adapter_namespace)
        .build()?;

    // Ensure the current sender owns the namespace
    assert_eq!(
        publisher.account().owner()?,
        daemon.sender(),
        "The current sender can not publish to this namespace. Please use the wallet that owns the Account that owns the Namespace."
    );

    // Publish the Adapter to the Abstract Platform
    publisher.publish_adapter::<MyAdapterInstantiateMsg, MyAdapterInterface<Daemon>>(
        MyAdapterInstantiateMsg {},
    )?;

    // Install the Adapter on a new account

    let account = abstract_client.account_builder().build()?;
    // Installs the adapter on the Account
    let adapter = account.install_adapter::<MyAdapterInterface<_>>(&[])?;

    // // Import adapter's endpoint function traits for easy interactions.
    use my_adapter::msg::MyAdapterQueryMsgFns;
    let status_response = adapter.status(adapter.account().id()?)?;
    assert!(status_response.status.is_none());

    // Execute the Adapter
    adapter.execute(
        &AdapterRequestMsg {
            // Adapter need to know on which account action is performed
            proxy_address: Some(adapter.account().proxy()?.to_string()),
            request: MyAdapterExecuteMsg::SetStatus {
                status: "new_status".to_owned(),
            },
        }
        .into(),
        None,
    )?;

    // Query the Adapter again
    let status_response = adapter.status(adapter.account().id()?)?;
    assert_eq!(status_response.status, Some("new_status".to_owned()));

    // Note: the Adapter is installed on a sub-account of the main account!
    assert_ne!(account.id()?, adapter.account().id()?);

    Ok(())
}
