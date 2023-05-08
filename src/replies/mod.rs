mod execute;
mod instantiate;

pub use execute::swapped_reply;
pub use instantiate::instantiate_reply;

pub const INSTANTIATE_REPLY_ID: u64 = 1u64;
pub const SWAPPED_REPLY_ID: u64 = 2u64;
pub const LP_WITHDRAWAL_REPLY_ID: u64 = 3u64;
