use crate::{
    error::MyAppError,
    handlers,
    msg::{MyAppExecuteMsg, MyAppInstantiateMsg, MyAppMigrateMsg, MyAppQueryMsg},
    replies::{self, INSTANTIATE_REPLY_ID},
    APP_VERSION, MY_APP_ID,
};

use abstract_app::AppContract;
use cosmwasm_std::Response;

/// The type of the result returned by your app's entry points.
pub type MyAppResult<T = Response> = Result<T, MyAppError>;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type MyApp =
    AppContract<MyAppError, MyAppInstantiateMsg, MyAppExecuteMsg, MyAppQueryMsg, MyAppMigrateMsg>;

const APP: MyApp = MyApp::new(MY_APP_ID, APP_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler)
    .with_migrate(handlers::migrate_handler)
    .with_dependencies(&[])
    .with_replies(&[(INSTANTIATE_REPLY_ID, replies::instantiate_reply)]);

// Export handlers
#[cfg(feature = "export")]
abstract_app::export_endpoints!(APP, MyApp);

abstract_app::cw_orch_interface!(APP, MyApp, MyAppInterface);

// TODO: add to docmuentation
// https://linear.app/abstract-sdk/issue/ABS-414/add-documentation-on-dependencycreation-trait
#[cfg(not(target_arch = "wasm32"))]
impl<Chain: cw_orch::environment::CwEnv> abstract_interface::DependencyCreation
    for crate::MyAppInterface<Chain>
{
    type DependenciesConfig = cosmwasm_std::Empty;
}
