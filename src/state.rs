use abstract_core::objects::AssetEntry;
use cosmwasm_std::{Addr, Decimal};
use cw_storage_plus::Item;

/// Configuration
#[cosmwasm_schema::cw_serde]
pub struct Config {
    pub commission_addr: Addr,
    pub max_swap_spread: Decimal,
    pub fee_asset: AssetEntry,
    pub dex: String,
}

pub const CONFIG: Item<Config> = Item::new("config");
pub const SUPPORTED_ASSETS: Item<Vec<AssetEntry>> = Item::new("supported_assets");

