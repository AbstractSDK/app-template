import { AbstractProvider } from '@abstract-money/abstract.js-react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router } from 'react-router-dom'

import ChainProvider from '~/lib/contexts/ChainProvider'
import Layout from '~/lib/layout'
import Routings from '~/lib/router/Routings'
import { theme } from '~/lib/styles/theme'

const queryClient = new QueryClient()

const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AbstractProvider>
        <ChainProvider>
          <Router>
            <Layout>
              <Routings />
            </Layout>
          </Router>
        </ChainProvider>
        <ReactQueryDevtools />
      </AbstractProvider>
    </QueryClientProvider>
  </ChakraProvider>
)

export default App
