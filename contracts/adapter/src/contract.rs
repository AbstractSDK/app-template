use crate::{handlers, ADAPTER_VERSION};

use cosmwasm_std::Response;
use my_package::adapter::error::MyAdapterError;
use my_package::adapter::msg::MyAdapterInstantiateMsg;
pub use my_package::adapter::MyAdapter;
pub use my_package::adapter::MyAdapter as Adapter;
use my_package::MY_ADAPTER_ID;

/// The type of the result returned by your app's entry points.
pub type AppResult<T = Response> = Result<T, MyAdapterError>;

const MY_ADAPTER: MyAdapter = MyAdapter::new(MY_ADAPTER_ID, ADAPTER_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler);

// Export handlers
#[cfg(feature = "export")]
abstract_adapter::export_endpoints!(MY_ADAPTER, MyAdapter);

#[cfg(feature = "interface")]
abstract_adapter::cw_orch_interface!(
    MY_ADAPTER,
    MyAdapter,
    MyAdapterInstantiateMsg,
    MyAdapterInterface
);
