import { Grid } from '@chakra-ui/react'

import CTASection from './components/CTASection'
import SomeImage from './components/SomeImage'
import SomeText from './components/SomeText'
import { AccountInput } from '~/lib/pages/home/components/AccountInput'

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
