import { AbstractProvider } from '@abstract-money/abstract.js-react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/lib/layout';
import Routings from '~/lib/router/Routings';
import { theme } from '~/lib/styles/theme';

const queryClient = new QueryClient();

const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AbstractProvider>
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </AbstractProvider>
    </QueryClientProvider>
  </ChakraProvider>
);

export default App;
