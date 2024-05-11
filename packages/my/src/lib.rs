use const_format::concatcp;

pub mod adapter;
pub mod app;

pub const MY_NAMESPACE: &str = "yournamespace";
pub const MY_APP_ID: &str = concatcp!(MY_NAMESPACE, ":", "app-name");
pub const MY_ADAPTER_ID: &str = concatcp!(MY_NAMESPACE, ":", "adapter-name");
