import { defineConfig } from 'vite'

async function initializeCryptoPolyfill() {
  if (!globalThis.crypto) {
    const { webcrypto } = await import('crypto')
    globalThis.crypto = webcrypto
  }
}

await initializeCryptoPolyfill()

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
