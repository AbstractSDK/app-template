import { Grid } from '@chakra-ui/react'

import { AccountInput } from '~/lib/pages/home/components/AccountInput'

import CTASection from './components/CTASection'
import SomeImage from './components/SomeImage'
import SomeText from './components/SomeText'

const Home = () => {
  return (
    <Grid gap={4}>
      <SomeText />
      <AccountInput />
      <SomeImage />
      <CTASection />
    </Grid>
  )
}

export default Home
