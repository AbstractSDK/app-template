use crate::contract::{FeeCollectorApp, FeeCollectorResult};
use crate::msg::FeeCollectorQueryMsg;
use crate::state::{Config, ALLOWED_ASSETS, CONFIG};
use abstract_core::objects::AssetEntry;
use cosmwasm_std::{to_binary, Binary, Deps, Env, StdResult};

pub fn query_handler(
    deps: Deps,
    _env: Env,
    _etf: &FeeCollectorApp,
    msg: FeeCollectorQueryMsg,
) -> FeeCollectorResult<Binary> {
    match msg {
        FeeCollectorQueryMsg::Config {} => to_binary(&query_config(deps)?),
        FeeCollectorQueryMsg::AllowedAssets {} => to_binary(&query_allowed_assets(deps)?),
    }
    .map_err(Into::into)
}

fn query_config(deps: Deps) -> StdResult<Config> {
    let config = CONFIG.load(deps.storage)?;
    Ok(config)
}

fn query_allowed_assets(deps: Deps) -> StdResult<Vec<AssetEntry>> {
    let allowed_assets = ALLOWED_ASSETS.load(deps.storage)?;
    Ok(allowed_assets)
}
