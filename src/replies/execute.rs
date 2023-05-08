use crate::{contract::{FeeCollectorApp, FeeCollectorResult}, state::CONFIG};

use abstract_sdk::{features::AbstractResponse, TransferInterface};
use cosmwasm_std::{DepsMut, Env, Reply, Response};

pub fn swapped_reply(
    deps: DepsMut,
    _env: Env,
    app: FeeCollectorApp,
    reply: Reply,
) -> FeeCollectorResult {
    let _data = reply.result.unwrap().data.unwrap();

    let config = CONFIG.load(deps.storage)?;

    let fee_balance = app.bank(deps.as_ref()).balance(&config.fee_asset)?;

    let transfer_msg = fee_balance.transfer_msg(config.commission_addr)?;

    Ok(app.tag_response(Response::new().add_message(transfer_msg), "swapped_reply"))
}
