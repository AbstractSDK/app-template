import { subgraphRequest } from '../hooks/useSubgraphQuery'
import { gql } from '../__generated__/gql'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { queries } from './index'

/**
 * Query a single Account's info.
 */
const accountQuerySpec = gql(/* GraphQL */ `
    query Account($chain: ID!, $accountId: ID!) {
        account(chain: $chain, accountId: $accountId) {
            vault {
                baseAsset
                value
            }
            info {
                name
                description
            }
            modules {
                id
            }
        }
    }
`)

export const accountQuery = (chainId: string, accountId: number) =>
  subgraphRequest(accountQuerySpec, {
    chain: chainId,
    accountId: accountId.toString(),
  })

export const useAccountQuery = (accountId: number) => {
  return useQuery({
    ...queries.account(accountId),
    select: (query) => {
      if (!query?.account) throw new Error('Account not found')
      return query.account
    },
    // TODO:
    // onSuccess: (data) => {
    //   data.forEach((vault) => {
    //     queryClient.setQueryData(vaultQueries.info(chainId, vault.vaultId).queryKey, vault)
    //   })
    // },
  })
}

