# Abstract App Module FeeCollector

The base state of an app includes the following:

- Proxy address
- Manager address
- AnsHost address (configurable)

The proxy and manager addresses are not configurable after instantiation.

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


