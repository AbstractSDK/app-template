import { useAccount } from '@abstract-money/abstract.js-react'
import { useApiQuery } from '@abstract-money/abstract.js-react'

import { gql } from '~/__generated__/gql'

const accountQuery = gql(/** GraphQL */ `
query AccountQuery($ids: [AccountIdWithChain!]!) {
  accountsByIds(ids: $ids) {
    info {
      name
      chainId
      governance {
        governanceType
        owner
      }
      description
      link
    }
    namespace
  }
}
`)

export const useAccountInfoQuery = () => {
  const { accountId } = useAccount()

  return useApiQuery(
    {
      queryKey: ['accountInfo', accountId],
      select: ({ accountsByIds }) => accountsByIds[0],
    },
    accountQuery,
    {
      ids: [accountId.toApi()],
    }
  )
}
