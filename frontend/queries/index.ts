import { accountQuery } from './account'
import { createQueryKeys } from '@lukemorales/query-key-factory'

export const queries = createQueryKeys('queries', {
  account: (accountId: number) => ({
    queryKey: [process.env.CHAIN_NAME!, accountId],
    queryFn: (ctx) => accountQuery(process.env.CHAIN_NAME!, accountId),
  }),
})
