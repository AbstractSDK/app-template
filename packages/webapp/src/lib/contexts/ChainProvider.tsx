import { wallets as keplrWallets } from '@cosmos-kit/keplr'
import { ChainProvider as CosmosChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import type { FC, PropsWithChildren } from 'react'

// Import this in your top-level route/layout
import '@interchain-ui/react/styles'

import { ChainRegistryClient } from '@abstract-money/abstract.js-react'

export const CHAIN_REGISTRY_CLIENT = new ChainRegistryClient(chains, assets)


const ChainProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CosmosChainProvider
      chains={chains} // supported chains
      assetLists={assets} // supported asset lists
      wallets={[...keplrWallets]} // supported wallets
    >
      {children}
    </CosmosChainProvider>
  )
}

export default ChainProvider
