import {
  AbstractAccountId,
  AccountProvider,
} from '@abstract-money/abstract.js-react'
import type { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import Page404 from '~/lib/pages/404'
import { type AccountIdParams } from '~/lib/router/routeParams'

interface AccountLayoutProps {}

/**
 * Provide the account to the nested routes.
 */
export const AccountLayout: FC<AccountLayoutProps> = () => {
  const { accountId } = useParams<AccountIdParams>()

  if (!accountId) {
    return <Page404 what={`Account ${accountId}`} />
  }

  return (
    <AccountProvider accountId={AbstractAccountId.fromStringId(accountId)}>
      <Outlet />
    </AccountProvider>
  )
}
