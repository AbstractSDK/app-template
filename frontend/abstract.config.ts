import { defineConfig } from '@abstract-money/cli'
import { react } from '@abstract-money/cli/plugins'

export default defineConfig({
  out: 'src/generated',
  contracts: [{ name: 'MyApp', namespace: 'local', version: '0.0.1', path: '../schema/my-app/0.0.1' }],
  plugins: [react()],
})
