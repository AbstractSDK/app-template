import React, { FC, PropsWithChildren } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { assets, chains } from 'chain-registry'
import { wallets as keplrWallets } from '@cosmos-kit/keplr'
import { wallets as cosmostationWallets } from '@cosmos-kit/cosmostation'
import { wallets as leapWallets } from '@cosmos-kit/leap'
import { SignerOptions } from '@cosmos-kit/core'
import { getSigningCosmosClientOptions } from 'interchain'
import { GasPrice } from '@cosmjs/stargate'
import { ChainProvider as CosmosChainProvider } from '@cosmos-kit/react'


export const ChainProvider: FC<PropsWithChildren> = ({ children }) => {
  const signerOptions: SignerOptions = {
    signingStargate: () => {
      return getSigningCosmosClientOptions();
    },
    signingCosmwasm: (chain) => {
      switch (chain.chain_name) {
        case 'localjuno':
          return {
            gasPrice: GasPrice.fromString('0.025ujuno'),
          };
        case 'cosmwasmtestnet':
          return {
            gasPrice: GasPrice.fromString('0.0025umlga'),
          };
      }
    },
  };
  return (<CosmosChainProvider
    chains={chains}
    assetLists={assets}
    wallets={[...keplrWallets, ...cosmostationWallets, ...leapWallets]}
    walletConnectOptions={{
      signClient: {
        projectId: 'a8510432ebb71e6948cfd6cde54b70f7',
        relayUrl: 'wss://relay.walletconnect.org',
        metadata: {
          name: 'CosmosKit Template',
          description: 'CosmosKit dapp template',
          url: 'https://docs.cosmoskit.com/',
          icons: [],
        },
      },
    }}
    signerOptions={signerOptions}
    endpointOptions={{
      endpoints: {
        cosmwasmtestnet: {
          rpc: ['https://rpc.malaga-420.cosmwasm.com/'],
          rest: ['https://api.malaga-420.cosmwasm.com'],
        },
      },
    }}
  >{children}</CosmosChainProvider>)
}
