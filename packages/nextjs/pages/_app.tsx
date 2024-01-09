import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@interchain-ui/react/styles';
import { defaultTheme } from '../config';
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ChainProvider } from '../contexts/ChainProvider';
import { AbstractProvider } from '@abstract-money/abstract.js-react/lib/contexts/AbstractProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={defaultTheme}>
      <ChainProvider>
        <QueryClientProvider client={queryClient}>
          <AbstractProvider chainNames={['junotestnet']} queryClient={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AbstractProvider>
        </QueryClientProvider>
      </ChainProvider>
    </ChakraProvider>
  );
}

export default CreateCosmosApp;
