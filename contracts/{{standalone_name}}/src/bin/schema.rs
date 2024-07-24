use cosmwasm_schema::{remove_schemas, write_api};
use {{standalone_name | snake_case}}::msg::{
    {{standalone_name | upper_camel_case}}ExecuteMsg, {{standalone_name | upper_camel_case}}InstantiateMsg, {{standalone_name | upper_camel_case}}MigrateMsg,
    {{standalone_name | upper_camel_case}}QueryMsg,
};
use std::env::current_dir;
use std::fs::create_dir_all;

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    write_api! {
        name: "schema",
        instantiate: {{standalone_name | upper_camel_case}}InstantiateMsg,
        query: {{standalone_name | upper_camel_case}}QueryMsg,
        execute: {{standalone_name | upper_camel_case}}ExecuteMsg,
        migrate: {{standalone_name | upper_camel_case}}MigrateMsg,
    };
}
