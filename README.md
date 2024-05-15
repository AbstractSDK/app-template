# Abstract App Module Template

The Abstract Module Template is a starting point for developing composable smart-contracts, or "Apps" on the Abstract platform. An App is instantiated for each Account individually and is migratable. Apps are allowed to perform actions on Abstract Accounts and can integrate with other Apps and Adapters installed on the Account. To learn more about Abstract Accounts, please see the [abstract accounts documentation](https://docs.abstract.money/3_framework/3_architecture.html). To read more about apps, please see the [app module documentation](https://docs.abstract.money/3_framework/6_module_types.html).

This template includes examples for both an app and adapter in a workspace.

## Getting Started

### Requirements

Learn more about the requirements for developing Abstract apps in the [getting started documentation](https://docs.abstract.money/4_get_started/1_index.html).

### Setup

To get started, clone this repository and run the following command:

```shell
chmod +x ./template-setup.sh
./template-setup.sh
```

The setup will suggest you to install a few tools that are used in the template. You can skip this step if you already have them installed or if you're not planning on using them.

### Updating Names

We recommend updating the names of the packages and variables to be custom to your application. You should be able to do this easily with a global replace.

For example:

- ~~my-app~~ -> ibcmail-client
- ~~my_app~~ -> ibcmail_client
- ~~MyApp~~ -> IbcMailClient
- ~~my-adapter~~ -> ibcmail-server
- ~~my_adapter~~ -> ibcmail_server
- ~~MyAdapter~~ -> IbcMailServer

## Using the Justfile

This repository comes with a [`justfile`](https://github.com/casey/just), which is a handy task runner that helps with building, testing, and publishing your Abstract app module.

### Installing Tools

To fully make use of the `justfile`, you need to install a few tools first. You can do this by simply running `just install-tools`. See [tools used the template](https://docs.abstract.money/3_get_started/2_installation.html?#tools-used-in-the-template) for more information.

### Available Tasks

Here are some of the tasks available in the `justfile`:

- `install-tools`: Install all the tools needed to run the tasks.
- `wasm`: Optimize the contract.
- `test`: Run all tests.
- `fmt`: Format the codebase (including .toml).
- `lint`: Lint-check the codebase.
- `lintfix`: Fix linting errors automatically.
- `watch`: Watch the codebase and run `cargo check` on changes.
- `watch-test`: Watch the codebase and run tests on changes.
- `publish {{chain-id}}`: Publish the App to a network.
- `schema`: Generate the json schemas for the contract
<!-- - `ts-codegen`: Generate the typescript app code for the contract -->
<!-- - `ts-publish`: Publish the typescript app code to npm -->
- `publish-schemas`: Publish the schemas by creating a PR on the Abstract [schemas](https://github.com/AbstractSDK/schemas) repository.

You can see the full list of tasks available by running `just --list`.

### Compiling

You can compile your module(s) by running the following command:

```sh
just wasm
```

This should result in an artifacts directory being created in your project root. Inside you will find a `my_module.wasm` file that is your module’s binary.

### Testing

You can test the module using the different provided methods.

1. **Integration testing:** We provide an integration testing setup in both contracts. The App tests can be found here [here](./contracts/app/tests/integration.rs). You can re-use the setup provided in this file to test different execution and query entry-points of your module. Once you are satisfied with the results you can try publishing it to a real chain.
2. **Local Daemon (Optional):** Once you have confirmed that your module works as expected you can spin up a local node and deploy Abstract + your app onto the chain. You need [Docker](https://www.docker.com/) installed for this step. You can do this by running the [test-local](./contracts/app/examples/test-local.rs) example, which uses a locally running juno daemon to deploy to. You can setup local juno using `just juno-local` command. At this point you can also test your front-end with the contracts.

Once testing is done you can attempt an actual deployment on test and mainnet.

### Publishing

Before attempting to publish your app you need to add your mnemonic to the `.env` file. **Don't use a mnemonic that has mainnet funds for testing.**

<!-- It's also assumed that you have an account and module namespace claimed with this account before publishing. You can read how to do that [here](https://docs.abstract.money/4_get_started/5_abstract_client.html). -->
Select from a wide range of [supported chains](https://orchestrator.abstract.money/chains/index.html) before proceeding. Make sure you've some balance enough to pay gas for the transaction.

You can now use `just publish {{chain-id}}` to run the [`examples/publish.rs`](./examples/publish.rs) script. The script will publish the app to the networks that you provided. Make sure you have enough funds in your wallet on the different networks you aim to publish on.

### Publishing Module Schemas

To publish your module schemas, we provide the `publish-schemas` command, which creates a pull request on the Abstract [schemas](https://github.com/AbstractSDK/schemas) repository.

Please install [github cli](https://cli.github.com/) before proceeding. Also login and setup your github auth by `gh auth login`. Now, we're ready to proceed.

```bash
just publish-schemas <namespace> <name> <version>
```

- `namespace`: Your module's namespace
- `name`: Your module's name
- `version`: Your module's version. Note that if you only include the minor version (e.g., `0.1`), you don't have to reupload the schemas for every patch version.

The command will automatically clone the Abstract Schemas repository, create a new branch with the given namespace, name, and version, and copy the schemas and metadata from your module to the appropriate directory.

For this command to work properly, please make sure that your `metadata.json` file is located at the root of your module's directory. This file is necessary for the Abstract Frontend to correctly interpret and display information about your module.

Example:

```bash
just publish-schemas my-namespace my-module 0.0.1
```

In the example above, `my-namespace` is the namespace, `my-module` is the module's name, and `0.1` is the minor version. If you create a patch for your module (e.g., `0.1.1`), you don't need to run `publish-schemas` again unless the schemas have changed.

## Contributing

We welcome contributions to the Abstract App Module Template! To contribute, fork this repository and submit a pull request with your changes. If you have any questions or issues, please open an issue in the repository and we will be happy to assist you.

## Community

Check out the following places for support, discussions & feedback:

- Join our [Discord server](https://discord.com/invite/uch3Tq3aym)
