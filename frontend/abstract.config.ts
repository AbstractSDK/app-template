import { defineConfig } from '@abstract-money/cli'
import { react, registry, vanilla } from '@abstract-money/cli/plugins'

export default defineConfig({
  out: 'app/_generated/generated-abstract',
  contracts: [
    {
      name: "board", // name of adapter
      path: "./contracts/board/schema/", // path to the schema of the adapter
      namespace: "rugspaceandcandles", // namespace
      version: "0.1.0",
      moduleType: "adapter",
    }
  ],
  plugins: [
    react(),
    vanilla({
      enableAppstractAppFor: ['board']
    }),
    registry({
      contracts: [{
        namespace: 'cw-plus',
        name: 'cw20-base',
        version: '1.0.1'
      }]
  })],
})
