# Abstract Account App

## Introduction

This Abstract App Template App is a Next.js-based application that demonstrates
interaction with Abstract Accounts on a CosmWasm-enabled chain. It includes logic for wallet connection, Account creation & queries, and shows interaction with general CosmWasm smart-contracts using Abstract.js codegen.

## Features

- Wallet connection and management using Graz
- Creation of Abstract Accounts
- Querying Abstract Account information via the Abstract Subgraph GraphQL API
- Code generation for type-safe interactions with smart contracts using Abstract
  Codegen

## Prerequisites

Before you begin, ensure you have met the following requirements:

- pnpm
- A Cosmos-compatible wallet (e.g., [Keplr](keplr.app))

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:AbstractSDK/templates.git
   ```

2. Navigate to the project directory:
   ```
   cd templates/frontend
   ```

3. Install the dependencies:
   ```
   pnpm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following:
   ```
   ABSTRACT_SUBGRAPH_URL=https://api.abstract.money/graphql
   ```

## Code Generation

This project uses code generation for type-safe interactions with smart
contracts and GraphQL queries. To generate the necessary code, run:

```
pnpm generate
```

This command will execute the following scripts:

1. `generate:graz`: Generates chain information for Graz
2. `generate:gql`: Generates TypeScript types for GraphQL queries using the
   GraphQL Code Generator
3. `generate:abstract`: Generates TypeScript types, methods, and hooks for smart
   contract interactions using Abstract CLI

## Development

To start the development server, run:

```
pnpm dev
```

Navigate to `http://localhost:3000` in your web browser to use the application.

## Key Components

### WalletConnection

Handles wallet connection using Graz.

### CreateAbstractAccount

Allows users to create new Abstract Accounts.

### QueryAbstractSubgraph

Queries and displays Abstract Account information using Abstract Subgraph
GraphQL API.

### CodegenContract

Demonstrates interaction with a CW20 token contract using generated code.
