import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    root: './test/',
    sequence: {
      concurrent: true
    },
    server: {
      deps: {
        inline: ['@gamepark/rules-api/']
      }
    }
  },
  plugins: [tsconfigPaths()]
})
