import { AbstractAccountId } from '@abstract-money/abstract.js-react'
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAvailableChainsQuery } from '~/lib/pages/home/hooks/useAvailableChainsQuery'

export const AccountInput = () => {
  const { data: chains } = useAvailableChainsQuery()
  const [accountChain, setAccountChain] = useState<string>()
  const [accountSeq, setAccountSeq] = useState<number>()
  const navigate = useNavigate()
  // const { data: chains } =

  const validate = useCallback(() => {
    if (!accountChain || accountSeq === undefined) return false
    try {
      new AbstractAccountId(accountChain, accountSeq)
      return true
    } catch {
      return false
    }
  }, [accountSeq])


  const handleClick = useCallback(() => {
    if (validate()) {
      navigate(`/account/${accountSeq}`)
    }
  }, [accountSeq, navigate, validate])

  return (
    <InputGroup size="md">
      <InputLeftAddon>
        <Select
          placeholder="Chain"
          onChange={(e) => {
            setAccountChain(e.target.value)
          }}
          value={accountChain}
          variant="filled"
        >
          {chains?.map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
        </Select>
      </InputLeftAddon>
      <Input
        aria-label="Account ID"
        placeholder="Account Id"
        value={accountSeq}
        type="number"
        onChange={(e) => {
          setAccountSeq(+e.target.value)
        }}
      />
      <InputRightAddon width="4.5rem">
        <Button size="sm" onClick={handleClick} variant={'transparent'}>
          Search
        </Button>
      </InputRightAddon>
    </InputGroup>
  )
}
