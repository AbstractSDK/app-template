import createContext from './createContext'
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { AbstractAccountClient, AbstractAccountQueryClient} from '@abstract-money/abstract.js'
import useAbstract from './AbstractContext'
import { useAccountQuery } from '../queries/account'
import { AccountQuery } from '../__generated__/gql/graphql'

interface AccountProps {
  accountNumber: number
}

interface AccountReturn {
  accountQueryClient: AbstractAccountQueryClient | undefined
  getAccountClient: () => Promise<AbstractAccountClient>
  accountInfo: AccountQuery['account'] | undefined
}

const [useAccount, _AccountProvider] = createContext<AccountReturn>('abstractAccount')

const AccountProvider: FC<PropsWithChildren<AccountProps>> = ({ accountNumber, children }) => {
  const { abstractQueryClient, getAbstractClient } = useAbstract()
  const [accountQueryClient, setAccountQueryClient] = useState<AbstractAccountQueryClient>()

  const { data: accountInfo } = useAccountQuery(accountNumber)

  useEffect(() => {
    ;(async function init() {
      if (!abstractQueryClient) return
      const accountQueryClient = await abstractQueryClient.loadAccount(accountNumber)
      setAccountQueryClient(accountQueryClient)
    })()
  }, [abstractQueryClient, accountNumber])

  const contextValue = useMemo<AccountReturn>(
    () => ({
      accountQueryClient,
      getAccountClient: (): Promise<AbstractAccountClient> => {
        if (!accountQueryClient) throw new Error('Account client not connected')
        return getAbstractClient().then((client) =>
          accountQueryClient.connectAbstractClient(client)
        )
      },
      accountInfo,
    }),
    [accountInfo, accountQueryClient, getAbstractClient]
  )

  return <_AccountProvider value={contextValue}>{children}</_AccountProvider>
}

export default useAccount
export { AccountProvider }
