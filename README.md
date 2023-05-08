# Abstract App Module FeeCollector
The Fee Collector contract allows you to collect fees in a specific asset (fee asset) from the users of your application, and swap it with other supported assets on a decentralized exchange (DEX). The resulting assets are then transferred to a designated commission address.

## Execute functions:
Execute has the following options:
1. `update_config`: updates the configuration of the fee collector contract. The admin is the only one who can call this function.
2. `add_allowed_assets`: adds new assets to the list of allowed assets that can be used for fee collection. The admin is the only one who can call this function.
3. `collect`: collects fees in the specified asset from all allowed assets, swaps them using a DEX (decentralized exchange) with a maximum spread, and sends the swapped funds to a specified commission address. The admin is the only one who can call this function.

## Contract logic:
This contract is designed to receive fees from any application and swap them for a designated fee asset. The contract administrator can update the configuration, add supported assets, and trigger the collection process. When triggered, the contract queries the balances of supported assets, swaps them for the designated fee asset, and sends the resulting funds to a commission address. The contract uses the DEX (decentralized exchange) to perform the asset swaps, and the maximum allowed swap spread can be configured by the administrator.

### Steps to Use the Fee Collector Contract
The Fee Collector contract provides a simple and efficient way to collect fees in a any assets from the users of your application, and convert them into the desired fee asset. By following the steps outlined below, you can easily deploy and use the Fee Collector contract on any CosmWasm blockchain.

1. Deploy the Fee Collector contract on the CosmWasm blockchain.
   
2. Initialize the contract by sending an `FeeCollectorInstantiateMsg` transaction with the following parameters:

    - `fee_asset`: The symbol of the asset that you want to collect as fees.
    - `commission_addr`: The address where you want to transfer the collected fees.
    - `dex`: The name of the DEX that you want to use for swapping assets.
    - `max_swap_spread`: The maximum spread that you are willing to accept when swapping assets. This is expressed as a decimal number between 0 and 1.

3. Send transactions to the Fee Collector contract to perform the following operations:

    - `update_config`: This operation allows you to update the configuration of the contract, including the commission address, fee asset, DEX, and maximum swap spread. This operation can only be performed by the admin of the contract.
    - `add_allowed_assets`: This operation allows you to add new supported assets to the contract. This operation can only be performed by the admin of the contract.
    - `collect`: This operation allows you to collect the assets from your application and swap them with the desired fee asset. The resulting assets are transferred to the commission address. This operation can only be performed by the admin of the contract.


## Using the Justfile

This repository comes with a `justfile`, which is a handy task runner that helps with building, testing, and deploying your Abstract app module.

### Installing Just

To use the `justfile`, you need to install `just` first. Please follow the instructions in the [official Just repository on GitHub](https://github.com/casey/just) to install it for your operating system.

### Available Tasks

Here are some of the tasks available in the `justfile`:

- `build`: Build everything with all features.
- `test`: Run all tests.
- `format`: Format the codebase.
- `lint`: Lint the codebase.
- `lintfix`: Fix linting errors automatically.
- `refresh`: Clean and update the project.
- `watch`: Watch the codebase and run `lcheck` on changes.
- `check`: Check the codebase for issues.
- `wasm`: Build all contracts in the repository for the specified chain.
- `deploy`: Deploy all the APIs to the specified network.
- `wasm-contract`: Build the specified module for the specified chain.
- `deploy-contract`: Deploy the specified module to the specified network.

You can see the full list of tasks available by running `just --list`.

To run a task, simply type `just <task-name>`. For example, to run the tests, you can type `just test`.


