use crate::msg::FeeCollectorMigrateMsg;
use crate::{
    dependencies::FEE_COLLECTOR_DEPS,
    error::FeeCollectorError,
    handlers,
    msg::{
        FeeCollectorExecuteMsg, FeeCollectorInstantiateMsg, FeeCollectorQueryMsg, FEE_COLLECTOR,
    },
    replies::{self, INSTANTIATE_REPLY_ID, SWAPPED_REPLY_ID},
};
use abstract_app::AppContract;
use cosmwasm_std::Response;
use cw20::Cw20ReceiveMsg;

/// The version of your module to be uploaded
const MODULE_VERSION: &str = env!("CARGO_PKG_VERSION");
/// The type of the result returned by your app's entrypoints.
pub type FeeCollectorResult<T = Response> = Result<T, FeeCollectorError>;

/// The type of the app that is used to build your app and access the Abstract SDK features.
pub type FeeCollectorApp = AppContract<
    FeeCollectorError,
    FeeCollectorInstantiateMsg,
    FeeCollectorExecuteMsg,
    FeeCollectorQueryMsg,
    FeeCollectorMigrateMsg,
    Cw20ReceiveMsg,
>;

const TEMPLATE_APP: FeeCollectorApp = FeeCollectorApp::new(FEE_COLLECTOR, MODULE_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler)
    .with_receive(handlers::receive_handler)
    .with_migrate(handlers::migrate_handler)
    .with_replies(&[
        (INSTANTIATE_REPLY_ID, replies::instantiate_reply),
        (SWAPPED_REPLY_ID, replies::swapped_reply),
    ])
    .with_dependencies(FEE_COLLECTOR_DEPS);

// Export handlers
#[cfg(feature = "export")]
abstract_app::export_endpoints!(TEMPLATE_APP, FeeCollectorApp);
