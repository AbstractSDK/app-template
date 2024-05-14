use crate::{
    error::MyAdapterError,
    handlers,
    msg::{MyAdapterExecuteMsg, MyAdapterInstantiateMsg, MyAdapterQueryMsg},
    ADAPTER_VERSION, MY_ADAPTER_ID,
};

use abstract_adapter::AdapterContract;
use cosmwasm_std::Response;

/// The type of the adapter that is used to build your Adapter and access the Abstract SDK features.
pub type MyAdapter = AdapterContract<
    MyAdapterError,
    MyAdapterInstantiateMsg,
    MyAdapterExecuteMsg,
    MyAdapterQueryMsg,
>;
/// The type of the result returned by your Adapter's entry points.
pub type AdapterResult<T = Response> = Result<T, MyAdapterError>;

const MY_ADAPTER: MyAdapter = MyAdapter::new(MY_ADAPTER_ID, ADAPTER_VERSION, None)
    .with_instantiate(handlers::instantiate_handler)
    .with_execute(handlers::execute_handler)
    .with_query(handlers::query_handler);

// Export handlers
#[cfg(feature = "export")]
abstract_adapter::export_endpoints!(MY_ADAPTER, MyAdapter);

abstract_adapter::cw_orch_interface!(
    MY_ADAPTER,
    MyAdapter,
    MyAdapterInstantiateMsg,
    MyAdapterInterface
);
