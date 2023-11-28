import { useApiQuery } from '@abstract-money/abstract.js-react/esm/api'

import { gql } from '~/__generated__/gql'
import { CHAIN_REGISTRY_CLIENT } from '~/lib/contexts/ChainProvider'

export const chainsQuery = gql(/** GraphQL */ `
  query Chains {
    chains
  }
`)

/**
 * Query the chains (names) that are avaialable via the Abstract API.
 */
export const useAvailableChainsQuery = () => {
  return useApiQuery(
    {
      select: ({ chains }) => chains.map((c) => CHAIN_REGISTRY_CLIENT.chainIdToName(c)),
    },
    chainsQuery
  )
}
