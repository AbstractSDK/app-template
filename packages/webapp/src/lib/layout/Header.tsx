import { Box, Flex, HStack, IconButton } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

import { ConnectButton } from '~/lib/components/wallet/ConnectButton'

import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <IconButton aria-label="Home" icon={<FaHome />} as={NavLink} to="/" />
      <Box marginLeft="auto">
        <HStack>
          <ThemeToggle />
          <ConnectButton />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Header
