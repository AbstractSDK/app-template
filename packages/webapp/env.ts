import {
  Schema,
  defineConfig,
} from '@julr/vite-plugin-validate-env'

export default defineConfig({
  VITE_ACCOUNT_ID: Schema.string(),
})
