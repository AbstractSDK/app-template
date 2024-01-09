import {
  useAccount,
  useManagerInfoQuery,
} from '@abstract-money/abstract.js-react'
import { Heading, Skeleton, Stack, Text } from '@chakra-ui/react'

import { useAccountInfoQuery } from '~/lib/pages/account/hooks/useAccountInfoQuery'

const AccountHome = () => {
  const { accountQueryClient, accountId } = useAccount()

  // Query the account's manager for some info
  const { data: accountInfo } = useManagerInfoQuery({
    client: accountQueryClient?.managerQueryClient,
    options: {
      select: ({ info }) => info,
    },
  })

  const { data: apiAccountInfo } = useAccountInfoQuery()

  console.log('accountInfo', apiAccountInfo)

  return (
    <Stack>
      <Heading>{accountId.toStringId()}</Heading>
      {/* <Text>{JSON.stringify(accountInfo)}</Text> */}
      <Text>{JSON.stringify(apiAccountInfo)}</Text>

      <Skeleton isLoaded={!!accountInfo}>
        <Text>{accountInfo?.name}</Text>
      </Skeleton>
    </Stack>
  )
}

export default AccountHome
