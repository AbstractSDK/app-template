use abstract_app::std::manager::ModuleInstallConfig;
use cosmwasm_std::Response;

pub use my_package::app::MyApp;
pub use my_package::app::MyApp as App;
use my_package::MY_APP_ID;

use crate::replies::INSTANTIATE_REPLY_ID;
use crate::{error::ClientError, handlers, replies, APP_VERSION};

/// The type of the result returned by your app's entry points.
pub type MyAppResult<T = Response> = Result<T, ClientError>;

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

#[cfg(feature = "interface")]
abstract_app::cw_orch_interface!(APP, MyApp, MyAppInterface);

// TODO: add to docmuentation
#[cfg(feature = "interface")]
impl<Chain: cw_orch::environment::CwEnv> abstract_interface::DependencyCreation
    for crate::MyAppInterface<Chain>
{
    type DependenciesConfig = cosmwasm_std::Empty;

    fn dependency_install_configs(
        _configuration: Self::DependenciesConfig,
    ) -> Result<Vec<ModuleInstallConfig>, abstract_interface::AbstractInterfaceError> {
        Ok(vec![])
    }
}
