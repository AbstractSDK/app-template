use abstract_app::objects::namespace::Namespace;
use abstract_client::AbstractClient;
use abstract_client::Application;
use cosmwasm_std::coins;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};

use my_app::contract::interface::MyAppInterface;
use my_app::{
    msg::{ConfigResponse, MyAppInstantiateMsg},
    *,
};
use my_package::app::msg::MyAppQueryMsgFns;
use my_package::MY_NAMESPACE;

struct TestEnv<Env: CwEnv> {
    env: Env,
    abs: AbstractClient<Env>,
    app: Application<Env, MyAppInterface<Env>>,
}

impl TestEnv<MockBech32> {
    /// Set up the test environment with an Account that has the App installed
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
        publisher.publish_app::<MyAppInterface<_>>()?;

        let app = publisher
            .account()
            .install_app::<MyAppInterface<_>>(&MyAppInstantiateMsg {}, &[])?;

        Ok(TestEnv {
            env: mock,
            abs: abs_client,
            app,
        })
    }
}

#[test]
fn successful_install() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let app = env.app;

    let config = app.config()?;
    assert_eq!(config, ConfigResponse {});
    Ok(())
}

mod update_config {
    use super::*;

    #[test]
    fn successful_update() -> anyhow::Result<()> {
        let env = TestEnv::setup()?;
        let app = env.app;

        app.update_config()?;

        let config = app.config()?;

        let expected_response = my_app::msg::ConfigResponse {};

        assert_eq!(config, expected_response);
        Ok(())
    }
}
