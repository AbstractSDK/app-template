import { useQuery } from '@tanstack/react-query'
import { AbstractAccountId, ContractMsg } from '@abstract-money/abstract.js'
import { useAccountQueryClient } from '@abstract-money/abstract.js-react/lib/hooks'
import { AppQueryClient } from '@abstract-money/abstract.js/lib/clients/AppClient'


interface UseAppQueryClientParams {
  appAccountId: AbstractAccountId
  appId: string
}

/**
 * Hook to retrieve an {@link AppQueryClient} for the provided accountId using
 * react-query.
 * @param accountId account to load.
 * @param appId module to load.
 */
export const useAppQueryClient = <TQueryMsg extends ContractMsg>({ appAccountId, appId }: UseAppQueryClientParams) => {
  const { data: accountQueryClient } = useAccountQueryClient({ accountId: appAccountId })

  return useQuery({
    queryFn: () => {
      if (!(accountQueryClient)) throw new Error('Missing query client')
      return new AppQueryClient<TQueryMsg>({
        moduleId: appId,
        abstractQueryClient: accountQueryClient.abstract,
        ...accountQueryClient,
      })
    },
    enabled: !!accountQueryClient,
  })
}
