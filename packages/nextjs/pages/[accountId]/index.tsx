import { useRouter } from 'next/router'
import { AbstractAccountId } from '@abstract-money/abstract.js'
import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useAccountQueryClient } from '@abstract-money/abstract.js-react/lib/hooks'

const Layout: FC<{ accountId: AbstractAccountId }> = ({ accountId }) => {
  const { data: queryClient } = useAccountQueryClient({ accountId })
  return <div>Account ID {accountId.toStringId()}</div>
}

export default function AccountId() {
  const router = useRouter()

  let accountId: AbstractAccountId | undefined
  try {
    accountId = AbstractAccountId.fromStringId(router.query.accountId as string)
  } catch (e) {
    return <Text>Invalid account id {router.query.accountId} </Text>
  }

  return <Layout accountId={accountId} />
}
