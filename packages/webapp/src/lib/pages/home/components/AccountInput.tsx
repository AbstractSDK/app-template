import { AbstractAccountId } from '@abstract-money/abstract.js-react'
import {
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAvailableChainsQuery } from '~/lib/pages/home/hooks/useAvailableChainsQuery'

interface AccountFields {
  chain: string
  seq: number
}

export const AccountInput = () => {
  const { handleSubmit, register } = useForm<AccountFields>({})
  const { data: chains } = useAvailableChainsQuery()
  const navigate = useNavigate()

  const onSubmit = ({ chain, seq }: AccountFields): void => {
    try {
      const accountId = new AbstractAccountId(chain, seq)

      navigate(`/account/${accountId.toStringId()}`)
    } catch (e) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup size="md">
        <InputLeftAddon>
          <Select placeholder="Chain" {...register('chain')} variant="filled">
            {chains?.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </Select>
        </InputLeftAddon>
        <NumberInput w="full">
          <NumberInputField placeholder="Sequence" {...register('seq')} />
        </NumberInput>
        <InputRightAddon width="4.5rem">
          <Button size="sm" type="submit" variant="transparent">
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  )
}
