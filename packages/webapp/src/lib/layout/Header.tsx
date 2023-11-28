import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { useChain } from '@cosmos-kit/react'

import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { connect } = useChain('juno')
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
          <Button onClick={connect}>Connect</Button>
          <ThemeToggle />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Header
