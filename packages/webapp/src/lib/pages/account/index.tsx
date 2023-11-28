import {
  useAccount,
  useManagerInfoQuery,
} from '@abstract-money/abstract.js-react'
import { useAbstractQueryClient } from '@abstract-money/abstract.js-react/lib/hooks'
import { Flex, Heading, Skeleton, Text } from '@chakra-ui/react'

const AccountHome = () => {
  const { accountQueryClient, accountId } = useAccount()
  const { data: test } = useAbstractQueryClient({ chainName: 'junotestnet' })

  console.log(accountQueryClient, test)

  // Use a raw query on the account
  const { data: accountInfo } = useManagerInfoQuery({
    client: accountQueryClient?.managerQueryClient,
    options: {
      select: ({ info }) => info,
    },
  })

  return (
    <Flex>
      <Heading>{accountId.toStringId()}</Heading>
      <Text>{JSON.stringify(accountInfo || {})}</Text>

      <Skeleton isLoaded={!!accountInfo}>
        <Text>{accountInfo?.name}</Text>
      </Skeleton>
    </Flex>
  )
}

export default AccountHome
