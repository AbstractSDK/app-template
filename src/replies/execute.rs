use crate::{contract::{FeeCollectorApp, FeeCollectorResult}, state::CONFIG};

use abstract_sdk::{features::AbstractResponse, TransferInterface};
use cosmwasm_std::{DepsMut, Env, Reply, Response};

pub fn swapped_reply(
    deps: DepsMut,
    _env: Env,
    app: FeeCollectorApp,
    _reply: Reply,
) -> FeeCollectorResult {
    let config = CONFIG.load(deps.storage)?;
    let bank = app.bank(deps.as_ref());

    let fee_balance = bank.balance(&config.fee_asset)?;

    let transfer_msg = bank.transfer(vec![fee_balance], &config.commission_addr)?;

    Ok(app.tag_response(Response::new().add_message(transfer_msg), "swapped_reply"))
}
