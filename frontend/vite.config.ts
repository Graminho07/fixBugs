import { defineConfig } from 'vite'

interface ExtendedCrypto extends Crypto {
  hash: {
    (algorithm: string, data: BufferSource): Promise<ArrayBuffer>
  }
}

declare global {
  var crypto: ExtendedCrypto
}

const initializeCrypto = async () => {
  if (!globalThis.crypto) {
    const { webcrypto } = await import('crypto')
    globalThis.crypto = {
      ...webcrypto,
      hash: async (algorithm: string, data: BufferSource) => {
        const subtle = webcrypto.subtle
        const buffer = typeof data === 'string' ? new TextEncoder().encode(data) : data
        return subtle.digest(algorithm, buffer)
      }
    } as ExtendedCrypto
  }
}

initializeCrypto()

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})