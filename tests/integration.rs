use std::str::FromStr;

use abstract_boot::{Abstract, AbstractAccount, AbstractBootError, ManagerQueryFns, VCExecFns};
use abstract_core::api::BaseExecuteMsgFns;
use abstract_core::objects::AssetEntry;
use abstract_dex_api::msg::DexInstantiateMsg;
use abstract_dex_api::{boot::DexApi, EXCHANGE};
use abstract_sdk::core::api::InstantiateMsg;
use abstract_testing::prelude::{EUR, USD};
use boot_core::ContractInstance;
use boot_core::*;
use boot_cw_plus::Cw20Base;
use cosmwasm_std::{coin, Decimal};
use cw_multi_test::ContractWrapper;
use fee_collector_app::{interface::FeeCollector, msg::FEE_COLLECTOR};
use fee_collector_app::{
    msg::{FeeCollectorExecuteMsgFns, FeeCollectorQueryMsgFns},
    state::Config,
};
use speculoos::iter::ContainingIteratorAssertions;
use speculoos::{assert_that, prelude::ContainingIntoIterAssertions, vec::VecAssertions};
use wyndex_bundle::{WynDex, WYNDEX, WYND_TOKEN};

const COMMISSION_ADDR: &str = "commission_addr";
const OWNER: &str = "owner";
const WYNDEX_TOKEN: &str = "wyndex_token";
const TEST_NAMESPACE: &str = "4t2";
pub type AResult = anyhow::Result<()>;

// This is where you can do your integration tests for your module
pub struct App<Chain: CwEnv> {
    pub account: AbstractAccount<Chain>,
    pub fee_collector: FeeCollector<Chain>,
    pub dex: DexApi<Chain>,
    pub wyndex: WynDex,
    pub abstract_core: Abstract<Chain>,
}

/// Instantiates the dex api and registers it with the version control
#[allow(dead_code)]
pub(crate) fn init_exchange(
    chain: Mock,
    deployment: &Abstract<Mock>,
    version: Option<String>,
) -> Result<DexApi<Mock>, AbstractBootError> {
    let mut exchange = DexApi::new(EXCHANGE, chain);
    exchange
        .as_instance_mut()
        .set_mock(Box::new(cw_multi_test::ContractWrapper::new_with_empty(
            ::abstract_dex_api::contract::execute,
            ::abstract_dex_api::contract::instantiate,
            ::abstract_dex_api::contract::query,
        )));
    exchange.upload()?;
    exchange.instantiate(
        &InstantiateMsg {
            module: DexInstantiateMsg {
                swap_fee: Decimal::from_str("0.003")?,
                recipient_os: 0,
            },
            base: abstract_core::api::BaseInstantiateMsg {
                ans_host_address: deployment.ans_host.addr_str()?,
                version_control_address: deployment.version_control.addr_str()?,
            },
        },
        None,
        None,
    )?;

    let version: semver::Version = version
        .map(|s| s.parse().unwrap())
        .unwrap_or_else(|| "1.0.0".parse().unwrap());

    deployment
        .version_control
        .register_apis(vec![exchange.as_instance()], &version)?;
    Ok(exchange)
}

fn init_fee_collector(
    chain: Mock,
    deployment: &Abstract<Mock>,
    _version: Option<String>,
) -> Result<FeeCollector<Mock>, AbstractBootError> {
    let mut fee_collector = FeeCollector::new(FEE_COLLECTOR, chain);
    
    fee_collector.as_instance_mut().set_mock(Box::new(
        cw_multi_test::ContractWrapper::new_with_empty(
            ::fee_collector_app::contract::execute,
            ::fee_collector_app::contract::instantiate,
            ::fee_collector_app::contract::query,
        )
        .with_reply_empty(fee_collector_app::contract::reply),
    ));
    fee_collector.upload()?;

    deployment
        .version_control
        .register_apps(
            vec![fee_collector.as_instance()],
            &"1.0.0".parse().unwrap()
        )
        .unwrap();
    Ok(fee_collector)
}

fn create_fee_collector(
    mock: Mock,
    allowed_assets: Vec<AssetEntry>,
) -> Result<App<Mock>, AbstractBootError> {
    let version = "1.0.0".parse().unwrap();
    // Deploy abstract
    let abstract_ = Abstract::deploy_on(mock.clone(), version)?;
    // create first Account
    abstract_.account_factory.create_default_account(
        abstract_core::objects::gov_type::GovernanceDetails::Monarchy {
            monarch: mock.sender.to_string(),
        },
    )?;

    abstract_
        .version_control
        .claim_namespaces(0, vec![TEST_NAMESPACE.to_string()])?;

    // Deploy mock dex
    let wyndex = WynDex::store_on(mock.clone()).unwrap();

    // Set up the dex and staking contracts
    let exchange_api = init_exchange(mock.clone(), &abstract_, None)?;
    let fee_collector = init_fee_collector(mock.clone(), &abstract_, None)?;

    // Create an Account that we will turn into a vault
    let account = abstract_.account_factory.create_default_account(
        abstract_core::objects::gov_type::GovernanceDetails::Monarchy {
            monarch: mock.sender.to_string(),
        },
    )?;

    // install dex
    account.manager.install_module(EXCHANGE, &Empty {})?;

    account.manager.install_module(
        FEE_COLLECTOR,
        &abstract_core::app::InstantiateMsg {
            module: fee_collector_app::msg::FeeCollectorInstantiateMsg {
                commission_addr: COMMISSION_ADDR.to_string(),
                max_swap_spread: Decimal::percent(10),
                fee_asset: EUR.to_string(),
                dex: WYNDEX.to_string(),
            },
            base: abstract_core::app::BaseInstantiateMsg {
                ans_host_address: abstract_.ans_host.addr_str()?,
            },
        },
    )?;

    // get its address
    let fee_collector_addr = account
        .manager
        .module_addresses(vec![FEE_COLLECTOR.into()])?
        .modules[0]
        .1
        .clone();
    // set the address on the contract
    fee_collector.set_address(&Addr::unchecked(fee_collector_addr.clone()));

    // give the autocompounder permissions to call on the dex and cw-staking contracts
    exchange_api
        .call_as(&account.manager.address()?)
        .update_authorized_addresses(vec![fee_collector_addr.clone()], vec![])?;

    let _fee_collector_config = fee_collector.config()?;

    // set allowed assets
    if allowed_assets.len() != 0 {
        fee_collector
        .call_as(&account.manager.address()?)
        .add_allowed_assets(allowed_assets)?;
    }

    Ok(App {
        account,
        fee_collector,
        abstract_core: abstract_,
        wyndex,
        dex: exchange_api,
    })
}

#[test]
fn test_update_config() -> AResult {
    let owner = Addr::unchecked(OWNER);
    let commission_addr = Addr::unchecked(COMMISSION_ADDR);
    let (_state, mock) = instantiate_default_mock_env(&owner)?;
    let mut app = create_fee_collector(mock.clone(), vec![])?;

    let eur_asset = AssetEntry::new(EUR);
    let usd_asset = AssetEntry::new(USD);
    
    let wynd_asset = AssetEntry::new(WYNDEX_TOKEN);

    app.fee_collector
        .call_as(&app.account.manager.address()?)
        .update_config(
            Some(COMMISSION_ADDR.to_string()),
            Some(WYNDEX.to_string()),
            Some(USD.to_string()),
            Some(Decimal::from_str("0.1")?),
        )?;

    let config: Config = app.fee_collector.config()?;
    assert_that!(config.fee_asset).is_equal_to(usd_asset.clone());
    assert_that!(config.dex).is_equal_to(WYNDEX.to_string());
    assert_that!(config.max_swap_spread).is_equal_to(Decimal::from_str("0.1")?);
    assert_that!(config.commission_addr).is_equal_to(commission_addr);

    // Adding fee asset is not allowed
    let err = app.fee_collector
        .call_as(&app.account.manager.address()?)
        .add_allowed_assets(vec![eur_asset.clone(), usd_asset.clone()]).unwrap_err();

    // Adding non fee assets
    app.fee_collector.call_as(&app.account.manager.address()?).add_allowed_assets(vec![eur_asset.clone()])?;
    let allowed_assets: Vec<AssetEntry> = app.fee_collector.allowed_assets()?;
    assert_that!(allowed_assets.len()).is_equal_to(1);
    assert_that!(allowed_assets).contains(eur_asset.clone());

    // update allowed assets
    app.fee_collector
        .call_as(&app.account.manager.address()?)
        .add_allowed_assets(vec![eur_asset.clone(), wynd_asset.clone()])?;

    let allowed_assets: Vec<AssetEntry> = app.fee_collector.allowed_assets()?;
    assert_that!(allowed_assets.len()).is_equal_to(2);
    assert_that!(allowed_assets).contains(eur_asset);
    assert_that!(allowed_assets).contains(wynd_asset);
    Ok(())
}

#[test]
fn test_collect_fees() -> AResult {
    let owner = Addr::unchecked(OWNER);
    let (_state, mock) = instantiate_default_mock_env(&owner)?;

    let eur_asset = AssetEntry::new(EUR);
    let usd_asset = AssetEntry::new(USD);
    let wynd_token = AssetEntry::new(WYND_TOKEN);
    let mut app = create_fee_collector(mock.clone(), vec![usd_asset.clone(), wynd_token.clone()])?;

    mock.set_balance(
        &app.account.proxy.address()?,
        vec![
            coin(100_000u128, EUR),
            coin(100_000u128, USD),
            coin(100_000u128, WYND_TOKEN),
        ],
    )?;

    // not admin
    let _err = app.fee_collector.collect().unwrap_err();

    // call as admin
    app.fee_collector
        .call_as(&app.account.manager.address()?)
        .collect()?;

    let fee_balances = mock.query_all_balances(&app.account.proxy.address()?)?;
    assert_that!(fee_balances).is_empty();

    let expected_usd_balance = coin(281322u128, EUR);
    let commission_balances = mock.query_all_balances(&Addr::unchecked(COMMISSION_ADDR))?;
    assert_that!(commission_balances).has_length(1);

    let usd_balance = commission_balances.get(0).unwrap();
    assert_that!(usd_balance).is_equal_to(&expected_usd_balance);

    Ok(())
}
