use my_app::{
    contract::interface::MyAppInterface,
    msg::{
        ConfigResponse, CountResponse, MyAppExecuteMsgFns, MyAppInstantiateMsg, MyAppQueryMsgFns,
    },
    MyAppError, MY_NAMESPACE,
};

use abstract_app::objects::namespace::Namespace;
use abstract_client::{AbstractClient, Application, Environment};
use cosmwasm_std::coins;
use cw_controllers::AdminError;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};

struct TestEnv<Env: CwEnv> {
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
        let abs_client = AbstractClient::builder(mock).build()?;
        // The app supports setting balances for addresses and configuring ANS.
        abs_client.set_balance(sender, &coins(123, "ucosm"))?;

        // Publish the app
        let publisher = abs_client.publisher_builder(namespace).build()?;
        publisher.publish_app::<MyAppInterface<_>>()?;

        let app = publisher
            .account()
            .install_app::<MyAppInterface<_>>(&MyAppInstantiateMsg { count: 0 }, &[])?;

        Ok(TestEnv {
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

#[test]
fn successful_increment() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let app = env.app;

    app.increment()?;
    let count: CountResponse = app.count()?;
    assert_eq!(count.count, 1);
    Ok(())
}

#[test]
fn successful_reset() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let app = env.app;

    app.reset(42)?;
    let count: CountResponse = app.count()?;
    assert_eq!(count.count, 42);
    Ok(())
}

#[test]
fn failed_reset() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let app = env.app;

    let err: MyAppError = app
        .call_as(&Addr::unchecked("NotAdmin"))
        .reset(9)
        .unwrap_err()
        .downcast()
        .unwrap();
    assert_eq!(err, MyAppError::Admin(AdminError::NotAdmin {}));
    Ok(())
}

#[test]
fn update_config() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let app = env.app;

    app.update_config()?;
    let config = app.config()?;
    let expected_response = my_app::msg::ConfigResponse {};
    assert_eq!(config, expected_response);
    Ok(())
}

#[test]
fn balance_added() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let account = env.app.account();

    // You can add balance to your account in test environment
    let add_balance = coins(100, "ucosm");
    account.add_balance(&add_balance)?;
    let balances = account.query_balances()?;

    assert_eq!(balances, add_balance);

    // Or set balance to any other address using cw_orch
    let mock_env = env.abs.environment();
    mock_env.add_balance(&env.app.address()?, add_balance.clone())?;
    let balances = mock_env.query_all_balances(&env.app.address()?)?;

    assert_eq!(balances, add_balance);
    Ok(())
}
