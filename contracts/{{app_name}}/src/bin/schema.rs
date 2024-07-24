use cosmwasm_schema::remove_schemas;
use {{app_name | snake_case}}::contract::{{app_name | upper_camel_case}};
use std::env::current_dir;
use std::fs::create_dir_all;

fn main() {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    create_dir_all(&out_dir).unwrap();
    remove_schemas(&out_dir).unwrap();

    {{app_name | upper_camel_case}}::export_schema(&out_dir);
}
