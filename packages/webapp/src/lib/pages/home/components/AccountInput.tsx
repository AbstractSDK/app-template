import {
  AbstractAccountId,
  useAccountClient,
} from '@abstract-money/abstract.js-react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import type React from 'react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AccountInput = () => {
  const [accountId, setAccountId] = useState('')
  const navigate = useNavigate()

  const validate = useCallback(() => {
    try {
      AbstractAccountId.fromStringId(accountId)
      return true
    } catch {
      return false
    }
  }, [accountId])

  const handleInputChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setAccountId(e.target.value)
    },
    []
  )

  const handleClick = useCallback(() => {
    if (validate()) {
      navigate(`/account/${accountId}`)
    }
  }, [accountId, navigate, validate])

  return (
    <InputGroup size="md">
      <Input
        aria-label="Account ID"
        placeholder="Account Id"
        value={accountId}
        onChange={handleInputChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
