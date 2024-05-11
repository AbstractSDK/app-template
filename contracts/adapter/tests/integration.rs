use abstract_client::AbstractClient;
use abstract_client::Application;
use abstract_std::objects::namespace::Namespace;
use cosmwasm_std::coins;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};

use my_adapter::MyAdapterInterface;
use my_adapter::{msg::ConfigResponse, *};
use my_package::adapter::msg::{MyAdapterInstantiateMsg, MyAdapterQueryMsgFns};
use my_package::MY_NAMESPACE;

struct TestEnv<Env: CwEnv> {
    env: Env,
    abs: AbstractClient<Env>,
    adapter: Application<Env, MyAdapterInterface<Env>>,
}

impl TestEnv<MockBech32> {
    /// Set up the test environment with an Account that has the App installed
    #[allow(clippy::type_complexity)]
    fn setup() -> anyhow::Result<TestEnv<MockBech32>> {
        // Create a sender and mock env
        let mock = MockBech32::new("mock");
        let sender = mock.sender();
        let namespace = Namespace::new(MY_NAMESPACE)?;

        // You can set up Abstract with a builder.
        let abs_client = AbstractClient::builder(mock.clone()).build()?;
        // The app supports setting balances for addresses and configuring ANS.
        abs_client.set_balance(sender, &coins(123, "ucosm"))?;

        // Publish both the app and the adapter
        let publisher = abs_client.publisher_builder(namespace).build()?;
        publisher.publish_adapter::<MyAdapterInstantiateMsg, MyAdapterInterface<_>>(
            MyAdapterInstantiateMsg {},
        )?;

        let adapter = publisher
            .account()
            .install_adapter::<MyAdapterInterface<_>>(&[])?;

        Ok(TestEnv {
            env: mock,
            abs: abs_client,
            adapter,
        })
    }
}

#[test]
fn successful_install() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let adapter = env.adapter;

    let config = adapter.config()?;
    assert_eq!(config, ConfigResponse {});
    Ok(())
}

mod update_config {
    use super::*;

    #[test]
    fn successful_update() -> anyhow::Result<()> {
        let env = TestEnv::setup()?;
        let adapter = env.adapter;

        adapter
            .call_as(&adapter.account().manager()?)
            .update_config()?;

        let config = adapter.config()?;

        let expected_response = my_adapter::msg::ConfigResponse {};

        assert_eq!(config, expected_response);
        Ok(())
    }
}
