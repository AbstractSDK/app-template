import { Box, Flex, HStack } from '@chakra-ui/react'

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
