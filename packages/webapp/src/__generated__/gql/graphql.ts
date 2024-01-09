/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A field whose value is a bech32 address: https://en.bitcoin.it/wiki/Bech32. */
  Bech32Address: { input: string; output: string }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** A field whose value is a Semantic Version: https://semver.org */
  Semver: { input: string; output: string }
  /** string tuple custom scalar type */
  StringSemverTuple: { input: any; output: any }
  /** string tuple custom scalar type */
  StringTuple: { input: any; output: any }
  _Any: { input: any; output: any }
  _FieldSet: { input: any; output: any }
}

export type AbstractAccount = {
  __typename?: 'AbstractAccount'
  /** Abstract Account Seqence & Trace */
  accountId: AccountId
  /**  ChainId of the Account  */
  chain: Scalars['String']['output']
  /**  The accountId prefixed with the chain *name* separated by '>'. juno>1 */
  id: Scalars['ID']['output']
  /** Info on the Account */
  info: AccountInfo
  /** Manager address of the Account */
  manager: Scalars['String']['output']
  /** Modules installed on the Account */
  modules: Array<AccountModule>
  /** The namespace of the Account */
  namespace?: Maybe<Scalars['String']['output']>
  /**  Root admin of the Account  */
  owner?: Maybe<Scalars['String']['output']>
  /**  Proxy address of the Account  */
  proxy: Scalars['String']['output']
  /** The subAccounts of the account */
  subAccounts: Array<AbstractAccount>
  /** Details about the vault of the Account */
  vault?: Maybe<Vault>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameService = {
  __typename?: 'AbstractNameService'
  asset?: Maybe<AnsAsset>
  assets: Array<AnsAsset>
  channel?: Maybe<AnsChannel>
  channels: Array<AnsChannel>
  contract?: Maybe<AnsContract>
  contracts: Array<AnsContract>
  id: Scalars['ID']['output']
  namespace?: Maybe<AnsNamespace>
  namespaces: Array<AnsNamespace>
  pool?: Maybe<AnsPool>
  pools: Array<AnsPool>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceAssetArgs = {
  id: Scalars['ID']['input']
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceAssetsArgs = {
  filter?: InputMaybe<IdsFilter>
  page?: InputMaybe<Page>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceChannelArgs = {
  id: Scalars['ID']['input']
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceChannelsArgs = {
  filter?: InputMaybe<EntriesFilter>
  page?: InputMaybe<Page>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceContractArgs = {
  id: Scalars['ID']['input']
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceContractsArgs = {
  filter?: InputMaybe<EntriesFilter>
  page?: InputMaybe<Page>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceNamespaceArgs = {
  id: Scalars['ID']['input']
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServiceNamespacesArgs = {
  page?: InputMaybe<Page>
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServicePoolArgs = {
  id: Scalars['ID']['input']
}

/** Abstract Name Service is used to resolve names to addresses and vice versa. */
export type AbstractNameServicePoolsArgs = {
  filter?: InputMaybe<PoolFilter>
}

export type AccountFilter = {
  /** Filter by the module and their version installed on the Account */
  modules?: InputMaybe<Array<AccountModuleFilter>>
  owner?: InputMaybe<Scalars['Bech32Address']['input']>
}

export type AccountGovernance = {
  __typename?: 'AccountGovernance'
  governanceType: Scalars['String']['output']
  owner: Scalars['String']['output']
}

export type AccountId = {
  __typename?: 'AccountId'
  chainName: Scalars['String']['output']
  sequence: Scalars['Int']['output']
  trace?: Maybe<Array<Scalars['String']['output']>>
}

export type AccountIdInput = {
  sequence: Scalars['Int']['input']
  trace?: InputMaybe<Array<Scalars['String']['input']>>
}

export type AccountIdWithChain = {
  chain: Scalars['String']['input']
  sequence: Scalars['Int']['input']
  trace?: InputMaybe<Array<Scalars['String']['input']>>
}

export type AccountInfo = {
  __typename?: 'AccountInfo'
  chainId: Scalars['String']['output']
  description?: Maybe<Scalars['String']['output']>
  governance: AccountGovernance
  link?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
}

/** A module installed on an Account. */
export type AccountModule = {
  __typename?: 'AccountModule'
  /** Address of the module installed on the account */
  address: Scalars['Bech32Address']['output']
  /** namespace:name */
  id: Scalars['ID']['output']
  /** Info about the module in Version Control */
  info?: Maybe<Module>
  /** Currently installed version of the module */
  version: Scalars['Semver']['output']
}

export type AccountModuleFilter = {
  id: Scalars['ID']['input']
  version?: InputMaybe<Scalars['String']['input']>
}

/** An asset registered on the Abstract Name Service. */
export type AnsAsset = {
  __typename?: 'AnsAsset'
  address: Scalars['String']['output']
  /** assetName */
  ansId?: Maybe<Scalars['String']['output']>
  /** chainid>assetName */
  id: Scalars['ID']['output']
  metadata?: Maybe<AssetMetadata>
  type: AssetType
}

export type AnsChannel = {
  __typename?: 'AnsChannel'
  chain: Scalars['String']['output']
  channel: Scalars['String']['output']
  /** chain:protocol */
  id: Scalars['ID']['output']
  protocol: Scalars['String']['output']
}

export type AnsContract = {
  __typename?: 'AnsContract'
  address: Scalars['Bech32Address']['output']
  ansId?: Maybe<Scalars['String']['output']>
  contract: Scalars['String']['output']
  /** contact:protocol */
  id: Scalars['ID']['output']
  protocol: Scalars['String']['output']
}

export type AnsNamespace = {
  __typename?: 'AnsNamespace'
  accountId: AccountId
  id: Scalars['ID']['output']
  namespace: Scalars['String']['output']
}

/** An ANS pool entry */
export type AnsPool = {
  __typename?: 'AnsPool'
  /** The pool address, a string or number */
  address: Scalars['String']['output']
  assets: Array<Scalars['String']['output']>
  dex: Scalars['String']['output']
  /** Abstract Pool Id (number) */
  id: Scalars['ID']['output']
  type: PoolType
}

export type AssetMetadata = {
  __typename?: 'AssetMetadata'
  coinGeckoId?: Maybe<Scalars['String']['output']>
  decimals?: Maybe<Scalars['Int']['output']>
  description?: Maybe<Scalars['String']['output']>
  displayDecimals?: Maybe<Scalars['Int']['output']>
  /** denom */
  id: Scalars['ID']['output']
  logo?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  symbol?: Maybe<Scalars['String']['output']>
}

/** The asset types supported by CosmWasm */
export enum AssetType {
  Cw20 = 'CW20',
  Cw1155 = 'CW1155',
  Native = 'NATIVE',
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type ChainInfo = {
  __typename?: 'ChainInfo'
  /** The id of the chain */
  chainId: Scalars['ID']['output']
  /** The id of the chain */
  id: Scalars['ID']['output']
  /** The chain name */
  name: Scalars['String']['output']
  /** Chain Pretty name */
  prettyName: Scalars['String']['output']
  /** REST URL of the chain */
  restUrl: Scalars['String']['output']
  /** RPC URL of the chain */
  rpcUrl: Scalars['String']['output']
}

export type CreateAccount = {
  description?: InputMaybe<Scalars['String']['input']>
  link?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type Deployment = {
  __typename?: 'Deployment'
  accountFactory: Scalars['Bech32Address']['output']
  ansHost: Scalars['Bech32Address']['output']
  chain: Scalars['String']['output']
  id: Scalars['ID']['output']
  registry: Scalars['Bech32Address']['output']
  /** @deprecated Use registry */
  versionControl: Scalars['Bech32Address']['output']
}

export type EntriesFilter = {
  /** Filter by specific JSON Entries */
  entries?: InputMaybe<Array<Scalars['String']['input']>>
}

export type IdsFilter = {
  /** Filter by specific IDs */
  ids?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Module = {
  __typename?: 'Module'
  address?: Maybe<Scalars['Bech32Address']['output']>
  codeId?: Maybe<Scalars['String']['output']>
  dependencies: Array<ModuleDependency>
  /** namespace:name:version */
  id: Scalars['ID']['output']
  metadata?: Maybe<ModuleMetadata>
  /** namespace:name */
  moduleId: Scalars['String']['output']
  /** JSON schema for the module within Abstract */
  moduleSchema?: Maybe<ModuleSchema>
  monetization?: Maybe<ModuleMonetization>
  /** The schema for the contract itself */
  schema?: Maybe<ModuleSchema>
  type: ModuleType
  version: Scalars['Semver']['output']
}

export type ModuleDependency = {
  __typename?: 'ModuleDependency'
  moduleId: Scalars['String']['output']
  versionRequirements: Array<Scalars['String']['output']>
}

export type ModuleFilter = {
  /** Filter by the module's name */
  name?: InputMaybe<Scalars['String']['input']>
  /** Filter by the module's namespace */
  namespace?: InputMaybe<Scalars['String']['input']>
  /** Filter by the module's status */
  status?: InputMaybe<ModuleStatus>
  /** Filter by the module's version */
  version?: InputMaybe<Scalars['String']['input']>
}

export type ModuleMetadata = {
  __typename?: 'ModuleMetadata'
  category?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  docs?: Maybe<Scalars['String']['output']>
  enabled?: Maybe<Scalars['Boolean']['output']>
  icon?: Maybe<Scalars['String']['output']>
  /** module_id/version/schema */
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  readme?: Maybe<Scalars['String']['output']>
  tags: Array<Scalars['String']['output']>
  /** @deprecated Use Module.type */
  type: ModuleType
  website?: Maybe<Scalars['String']['output']>
}

export type ModuleMonetization = ModuleMonetizationFixedPrice

export type ModuleMonetizationFixedPrice = {
  __typename?: 'ModuleMonetizationFixedPrice'
  /** The asset for the price */
  asset: Scalars['String']['output']
  /** The price of the module */
  price: Scalars['String']['output']
}

/** The CosmWasm schema for execute, query, migrate, and instantiate */
export type ModuleSchema = {
  __typename?: 'ModuleSchema'
  execute?: Maybe<Scalars['JSON']['output']>
  /** module_id/version/schema */
  id: Scalars['ID']['output']
  instantiate?: Maybe<Scalars['JSON']['output']>
  migrate?: Maybe<Scalars['JSON']['output']>
  query?: Maybe<Scalars['JSON']['output']>
  /** The module's schema */
  schema: Scalars['JSON']['output']
}

/** The status of a module in Version Control */
export enum ModuleStatus {
  Pending = 'PENDING',
  Registered = 'REGISTERED',
  Yanked = 'YANKED',
}

/** The different types of modules supported by Abstract. */
export enum ModuleType {
  AccountBase = 'account_base',
  Adapter = 'adapter',
  App = 'app',
  Native = 'native',
  Standalone = 'standalone',
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Add a key-value pair to the cloudflare worker for the specified address. Returns the new value. */
  addPkKvPair?: Maybe<Scalars['JSON']['output']>
  registerVersionControl?: Maybe<Scalars['String']['output']>
}

export type MutationAddPkKvPairArgs = {
  address: Scalars['Bech32Address']['input']
  chain: Scalars['ID']['input']
  key: Scalars['String']['input']
  nonce?: InputMaybe<Scalars['Int']['input']>
  signature: Scalars['String']['input']
  value?: InputMaybe<Scalars['JSON']['input']>
}

export type MutationRegisterVersionControlArgs = {
  address: Scalars['Bech32Address']['input']
  auth: Scalars['String']['input']
  chain: Scalars['ID']['input']
}

export type Page = {
  afterId?: InputMaybe<Scalars['String']['input']>
}

export type PoolFilter = {
  /** The assets in the pool. Must have exactly 2 elements. */
  assetPair?: InputMaybe<Array<Scalars['String']['input']>>
  dex?: InputMaybe<Scalars['String']['input']>
}

export enum PoolType {
  ConstantProduct = 'ConstantProduct',
  LiquidityBootstrap = 'LiquidityBootstrap',
  Stable = 'Stable',
  Weighted = 'Weighted',
}

export type Query = {
  __typename?: 'Query'
  _service: _Service
  /** Query an Account by its ID */
  account?: Maybe<AbstractAccount>
  /** List the Accounts registered in Abstract for the given chain */
  accounts: Array<AbstractAccount>
  /** Query multiple Accounts by their IDs */
  accountsByIds: Array<AbstractAccount>
  /** Query Abstract Name Service */
  ans: AbstractNameService
  /** Query info on a Cosmos chain */
  chainInfo: ChainInfo
  /** List the chains supported by this subgraph */
  chains: Array<Scalars['String']['output']>
  /** Retrieve Abstract's deployment details for the given chain and optional version */
  deployment: Deployment
  /** Retrieve each Abstract deployment */
  deployments: Array<Deployment>
  /** Query the key-value pair for a given address */
  keyValueByAddress?: Maybe<Scalars['JSON']['output']>
  /** Query a module in Version Control by its moduleId. If version is not provided, will return latest */
  module?: Maybe<Module>
  /** List the modules registered in Version Control */
  modules: Array<Module>
  /** Retrieve the nonce from the cloudflare worker for setting a key value */
  nextKeyValueByAddressNonce: Scalars['Int']['output']
  test: Scalars['String']['output']
  /** Retrieve the version of the version of Abstract supported by the subgraph */
  version: Scalars['String']['output']
}

export type QueryAccountArgs = {
  accountId: AccountIdInput
  chain: Scalars['ID']['input']
}

export type QueryAccountsArgs = {
  chain?: InputMaybe<Scalars['ID']['input']>
  chains: Array<Scalars['ID']['input']>
  filter?: InputMaybe<AccountFilter>
  page?: InputMaybe<Page>
}

export type QueryAccountsByIdsArgs = {
  ids: Array<AccountIdWithChain>
}

export type QueryAnsArgs = {
  chain: Scalars['ID']['input']
}

export type QueryChainInfoArgs = {
  chain: Scalars['ID']['input']
}

export type QueryDeploymentArgs = {
  chain: Scalars['ID']['input']
  version?: InputMaybe<Scalars['String']['input']>
}

export type QueryKeyValueByAddressArgs = {
  address: Scalars['Bech32Address']['input']
  chain: Scalars['ID']['input']
  key: Scalars['String']['input']
}

export type QueryModuleArgs = {
  chain: Scalars['ID']['input']
  moduleId: Scalars['ID']['input']
  version?: InputMaybe<Scalars['Semver']['input']>
}

export type QueryModulesArgs = {
  chain: Scalars['ID']['input']
  filter?: InputMaybe<ModuleFilter>
  page?: InputMaybe<Page>
}

export type QueryNextKeyValueByAddressNonceArgs = {
  address: Scalars['Bech32Address']['input']
  chain: Scalars['ID']['input']
}

export type Vault = {
  __typename?: 'Vault'
  /** The assets registered to the Account */
  assets: Array<VaultAsset>
  /** Base asset used for value calculation on the Account */
  baseAsset?: Maybe<Scalars['String']['output']>
  /** Proxy address */
  depositAddress: Scalars['String']['output']
  /** chain>proxyAddress */
  id: Scalars['ID']['output']
  /** Total value of all assets in vault */
  value?: Maybe<Scalars['String']['output']>
}

export type VaultAsset = {
  __typename?: 'VaultAsset'
  /** Amount of the asset held by the vault */
  balance?: Maybe<Scalars['String']['output']>
  /** Name of the asset in the vault */
  id: Scalars['ID']['output']
  /** ANS Info on the asset */
  info?: Maybe<AnsAsset>
  /** Price source of the asset. Currently JSON serialized string of the price source */
  priceSource?: Maybe<Scalars['String']['output']>
  /** Value of the vault asset in the base asset */
  value?: Maybe<Scalars['String']['output']>
  /**
   * TODO
   * @deprecated Use priceSource
   */
  valueRef?: Maybe<Scalars['String']['output']>
}

export type _Service = {
  __typename?: '_Service'
  sdl?: Maybe<Scalars['String']['output']>
}

export type AccountQueryQueryVariables = Exact<{
  ids: Array<AccountIdWithChain> | AccountIdWithChain
}>

export type AccountQueryQuery = {
  __typename?: 'Query'
  accountsByIds: Array<{
    __typename?: 'AbstractAccount'
    namespace?: string | null
    info: {
      __typename?: 'AccountInfo'
      name: string
      chainId: string
      description?: string | null
      link?: string | null
      governance: {
        __typename?: 'AccountGovernance'
        governanceType: string
        owner: string
      }
    }
  }>
}

export type ChainsQueryVariables = Exact<{ [key: string]: never }>

export type ChainsQuery = { __typename?: 'Query'; chains: Array<string> }

export const AccountQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'AccountIdWithChain' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accountsByIds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ids' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chainId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'governance' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'governanceType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'owner' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountQueryQuery, AccountQueryQueryVariables>
export const ChainsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Chains' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'chains' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChainsQuery, ChainsQueryVariables>
