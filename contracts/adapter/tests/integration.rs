use my_adapter::{
    contract::interface::MyAdapterInterface,
    msg::{ConfigResponse, MyAdapterExecuteMsgFns, MyAdapterInstantiateMsg, MyAdapterQueryMsgFns},
    MyAdapterExecuteMsg, MY_NAMESPACE,
};

use abstract_adapter::std::{adapter::AdapterRequestMsg, objects::namespace::Namespace};
use abstract_client::{AbstractClient, Application};
use cosmwasm_std::coins;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};

struct TestEnv<Env: CwEnv> {
    abs: AbstractClient<Env>,
    adapter: Application<Env, MyAdapterInterface<Env>>,
}

impl TestEnv<MockBech32> {
    /// Set up the test environment with an Account that has the Adapter installed
    #[allow(clippy::type_complexity)]
    fn setup() -> anyhow::Result<TestEnv<MockBech32>> {
        // Create a sender and mock env
        let mock = MockBech32::new("mock");
        let sender = mock.sender();
        let namespace = Namespace::new(MY_NAMESPACE)?;

        // You can set up Abstract with a builder.
        let abs_client = AbstractClient::builder(mock).build()?;
        // The adapter supports setting balances for addresses and configuring ANS.
        abs_client.set_balance(sender, &coins(123, "ucosm"))?;

        // Publish the adapter
        let publisher = abs_client.publisher_builder(namespace).build()?;
        publisher.publish_adapter::<MyAdapterInstantiateMsg, MyAdapterInterface<_>>(
            MyAdapterInstantiateMsg {},
        )?;

        let adapter = publisher
            .account()
            .install_adapter::<MyAdapterInterface<_>>(&[])?;

        Ok(TestEnv {
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

#[test]
fn update_config() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let adapter = env.adapter;

    // Executing it on publisher account
    // Note that it's not a requirement to have it installed in this case
    let publisher_account = env
        .abs
        .publisher_builder(Namespace::new(MY_NAMESPACE).unwrap())
        .build()?;

    adapter.execute(
        &AdapterRequestMsg {
            proxy_address: Some(publisher_account.account().proxy()?.to_string()),
            request: MyAdapterExecuteMsg::UpdateConfig {},
        }
        .into(),
        None,
    )?;

    let config = adapter.config()?;
    let expected_response = my_adapter::msg::ConfigResponse {};
    assert_eq!(config, expected_response);

    // Adapter installed on sub-account of the publisher so this should error
    let err = adapter
        .execute(
            &AdapterRequestMsg {
                proxy_address: Some(adapter.account().proxy()?.to_string()),
                request: MyAdapterExecuteMsg::UpdateConfig {},
            }
            .into(),
            None,
        )
        .unwrap_err();
    assert_eq!(err.root().to_string(), "Unauthorized");

    Ok(())
}

#[test]
fn set_status() -> anyhow::Result<()> {
    let env = TestEnv::setup()?;
    let adapter = env.adapter;

    let first_status = "my_status".to_owned();
    let second_status = "my_status".to_owned();

    adapter
        .call_as(&adapter.account().manager()?)
        .set_status(first_status.clone())?;

    let new_account = env
        .abs
        .account_builder()
        .install_adapter::<MyAdapterInterface<MockBech32>>()?
        .build()?;

    // For adapters can use same object across accounts
    adapter
        .call_as(&new_account.manager()?)
        .set_status(second_status.clone())?;

    let status_response = adapter.status(adapter.account().id()?)?;
    assert_eq!(status_response.status, Some(first_status));

    let status_response = adapter.status(new_account.id()?)?;
    assert_eq!(status_response.status, Some(second_status));

    Ok(())
}
