import { FC, PropsWithChildren, useMemo } from 'react'
import { QueryMsg as TemplateQueryMsg } from 'app-sdk/src/contracts/Template.types'
import createContext from '@abstract-money/abstract.js-react/lib/contexts/createContext'
import { AbstractAccountId } from '@abstract-money/abstract.js'
import { useAppQueryClient } from '../hooks/useAppQueryClient'
import { AppQueryClient } from '@abstract-money/abstract.js/lib/clients/AppClient'

interface AppReturn {
  queryClient: AppQueryClient<TemplateQueryMsg> | undefined
  // getClient: (signingClient: SigningCosmWasmClient, address: string) => AppClient<TemplateQueryMsg, TemplateExecuteMsg>
}

interface AppProviderProps {
  appAccountId: AbstractAccountId
}

const TEMPLATE_APP_ID = process.env.NEXT_TEMPLATE_APP_ID
const [useApp, _AppProvider] = createContext<AppReturn>('template')

/**
 * Provide the app client.
 * @param children
 * @param appAccountId
 * @constructor
 */
const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children, appAccountId }) => {
  if (!TEMPLATE_APP_ID) throw new Error('TEMPLATE_APP_ID not found')

  const { data: queryClient } = useAppQueryClient<TemplateQueryMsg>({
    appAccountId: appAccountId,
    appId: TEMPLATE_APP_ID,
  })

  const contextValue = useMemo<AppReturn>(
    () => ({
      queryClient: queryClient,
    }),
    [queryClient]
  )

  return <_AppProvider value={contextValue}>{children}</_AppProvider>
}

export default useApp
export { AppProvider }
