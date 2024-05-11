use crate::contract::{App, MyAppResult};

use abstract_app::traits::AbstractResponse;
use cosmwasm_std::{DepsMut, Env, Reply};

pub fn instantiate_reply(_deps: DepsMut, _env: Env, app: App, _reply: Reply) -> MyAppResult {
    Ok(app.response("instantiate_reply"))
}
