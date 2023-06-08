import React, { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useAccount, { AccountProvider } from '../../contexts/AccountContext'
import { useAccountQuery } from '../../queries/account'

interface AccountIdProps {

}

export const AccountId: FC<AccountIdProps> = () => {
  const router = useRouter();

  const { accountId } = router.query;

  if (!Number(accountId)) return (<>Invalid accountId</>)

  return (<AccountProvider accountNumber={Number(accountId)}>
    <AccountPage />
  </AccountProvider>)
}

export const AccountPage: FC = () => {
  const { accountQueryClient, accountInfo } = useAccount()

  return <></>
}

// export async function getStaticProps() {
//
//   return {
//     props: {
//       accountInfo: {
//
//       }
//     }
//   }
// }
