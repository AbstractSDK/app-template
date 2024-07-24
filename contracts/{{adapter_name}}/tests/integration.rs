use {{adapter_name | snake_case}}::{
    contract::interface::{{adapter_name | upper_camel_case}}Interface,
    msg::{ConfigResponse, ExecuteMsg, {{adapter_name | upper_camel_case}}InstantiateMsg, {{adapter_name | upper_camel_case}}QueryMsgFns},
    {{adapter_name | upper_camel_case}}ExecuteMsg, {{adapter_name | shouty_snake_case}}_ID, {{project-name | shouty_snake_case}}_NAMESPACE,
};

use abstract_adapter::std::{adapter::AdapterRequestMsg, objects::namespace::Namespace};
use abstract_client::{AbstractClient, Application, Publisher};
use cosmwasm_std::coins;
// Use prelude to get all the necessary imports
use cw_orch::{anyhow, prelude::*};

struct TestEnv<Env: CwEnv> {
    publisher: Publisher<Env>,
    abs: AbstractClient<Env>,
    adapter: Application<Env, {{adapter_name | upper_camel_case}}Interface<Env>>,
}

impl TestEnv<MockBech32> {
    /// Set up the test environment with an Account that has the Adapter installed
    #[allow(clippy::type_complexity)]
    fn setup() -> anyhow::Result<TestEnv<MockBech32>> {
        // Create a sender and mock env
        let mock = MockBech32::new("mock");
        let sender = mock.sender_addr();
        let namespace = Namespace::new({{project-name | shouty_snake_case}}_NAMESPACE)?;

        // You can set up Abstract with a builder.
        let abs_client = AbstractClient::builder(mock).build()?;
        // The adapter supports setting balances for addresses and configuring ANS.
        abs_client.set_balance(sender, &coins(123, "ucosm"))?;

        // Publish the adapter
        let publisher = abs_client.publisher_builder(namespace).build()?;
        publisher.publish_adapter::<{{adapter_name | upper_camel_case}}InstantiateMsg, {{adapter_name | upper_camel_case}}Interface<_>>(
            {{adapter_name | upper_camel_case}}InstantiateMsg {},
        )?;

        let adapter = publisher
            .account()
            .install_adapter::<{{adapter_name | upper_camel_case}}Interface<_>>(&[])?;

        Ok(TestEnv {
            abs: abs_client,
            publisher,
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
        .publisher_builder(Namespace::new({{project-name | shouty_snake_case}}_NAMESPACE).unwrap())
        .build()?;

    adapter.execute(
        &AdapterRequestMsg {
            proxy_address: Some(publisher_account.account().proxy()?.to_string()),
            request: {{adapter_name | upper_camel_case}}ExecuteMsg::UpdateConfig {},
        }
        .into(),
        None,
    )?;

    let config = adapter.config()?;
    let expected_response = {{adapter_name | snake_case}}::msg::ConfigResponse {};
    assert_eq!(config, expected_response);

    // Adapter installed on sub-account of the publisher so this should error
    let err = adapter
        .execute(
            &AdapterRequestMsg {
                proxy_address: Some(adapter.account().proxy()?.to_string()),
                request: {{adapter_name | upper_camel_case}}ExecuteMsg::UpdateConfig {},
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

    let subaccount = &env.publisher.account().sub_accounts()?[0];

    subaccount.as_ref().manager.execute_on_module(
        {{adapter_name | shouty_snake_case}}_ID,
        ExecuteMsg::Module(AdapterRequestMsg {
            proxy_address: Some(subaccount.proxy()?.to_string()),
            request: {{adapter_name | upper_camel_case}}ExecuteMsg::SetStatus {
                status: first_status.clone(),
            },
        }),
    )?;

    let new_account = env
        .abs
        .account_builder()
        .install_adapter::<{{adapter_name | upper_camel_case}}Interface<MockBech32>>()?
        .build()?;

    new_account.as_ref().manager.execute_on_module(
        {{adapter_name | shouty_snake_case}}_ID,
        ExecuteMsg::Module(AdapterRequestMsg {
            proxy_address: Some(new_account.proxy()?.to_string()),
            request: {{adapter_name | upper_camel_case}}ExecuteMsg::SetStatus {
                status: second_status.clone(),
            },
        }),
    )?;

    let status_response = adapter.status(adapter.account().id()?)?;
    assert_eq!(status_response.status, Some(first_status));

    let status_response = adapter.status(new_account.id()?)?;
    assert_eq!(status_response.status, Some(second_status));

    Ok(())
}
