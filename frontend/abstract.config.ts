import { defineConfig } from '@abstract-money/cli'
import { react, registry } from '@abstract-money/cli/plugins'

export default defineConfig({
  out: 'app/_generated/generated-abstract',
  contracts: [],
  plugins: [react(), registry({
    contracts: [{
      namespace: 'cw-plus',
      name: 'cw721-base',
      version: '0.18'
    },
    {
      namespace: 'abstract',
      name: 'evm-note',
      version: '0.0.2'
    }]
  })],
})
