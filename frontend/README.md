# Abstract Account App

## Introduction

This Abstract App Template is a modern web application that demonstrates
interaction with Abstract Accounts on a CosmWasm-enabled chain. It leverages a
powerful tech stack:

- [React](https://reactjs.org/docs/getting-started.html): A JavaScript library
  for building user interfaces
- [TypeScript](https://www.typescriptlang.org/docs/): Typed superset of
  JavaScript
- [Next.js](https://nextjs.org/docs): React framework for production-grade
  applications
- [shadcn/ui](https://ui.shadcn.com/docs): Beautifully designed components built
  with Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/docs): Utility-first CSS framework

For blockchain interactions:

- [Graz](https://graz.sh/docs): React hooks for Cosmos blockchain
- [React Query](https://tanstack.com/query/latest/docs/react/overview): Data
  synchronization for React
- [Abstract.js](https://docs.abstract.money/abstract-js/): SDK for interacting
  with Abstract Protocol

The app includes logic for wallet connection, Account creation & queries, and
demonstrates interaction with CosmWasm smart contracts using Abstract.js code
generation.

## Features

- Wallet connection and management using Graz
- Creation of Abstract Accounts
- Querying Abstract Account information via the Abstract GraphQL API
- Code generation for type-safe interactions with smart contracts using
  [Abstract.js](https://abstract.js.abstract.money)

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

1. Duplicate the `.env.example` file and rename it to `.env`:
   ```
   cp .env.example .env
   ```

2. Open the `.env` file and ensure it contains the following:
   ```
   ABSTRACT_SUBGRAPH_URL=https://api.abstract.money/graphql
   ```

   You can modify the values if needed.

## Updating abstract.config.ts

Before running the code generation, follow these steps:

1. Ensure that you have generated the module schema. This step is crucial as it
   creates the necessary schema files for the code generation process.

2. After generating the module schema, update the `abstract.config.ts` file with
   the proper module name, namespace, and version. Here's how:

   a. Open the `abstract.config.ts` file in the project root directory.

   b. Locate the `contracts` array in the configuration and update it to match
   your module's details. For example:

   ```typescript
   contracts: [
     {
       name: "your_module_name", 
       path: "../contracts/your_module_name/schema/", 
       namespace: "your-namespace", 
       version: "0.1.0",
       moduleType: "adapter",
     }
   ],
   ```

   Replace `"your_module_name"`, `"your-namespace"`, and `"0.1.0"` with your
   actual module name, namespace, and version respectively. Also, ensure the
   `path` is correct for your project structure.

   c. Save the changes to the `abstract.config.ts` file.

3. Verify that the schema file inside the path specified in step 2b is named
   `module-schema.json`.

After completing these steps, you can proceed with running the code generation
command that references the module-generated code.

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
