import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Readable } from 'node:stream'
import joinWorker from './worker/src/index'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'join-form-local-api',
        configureServer(server) {
          server.middlewares.use('/api/join', async (req, res) => {
            const host = req.headers.host ? `http://${req.headers.host}` : 'http://localhost:5173'
            const headers = new Headers()

            for (const [key, value] of Object.entries(req.headers)) {
              if (Array.isArray(value)) headers.set(key, value.join(', '))
              else if (value) headers.set(key, value)
            }
            if (!headers.has('Origin')) headers.set('Origin', host)

            const body = req.method === 'GET' || req.method === 'HEAD'
              ? undefined
              : Readable.toWeb(req)

            const request = new Request(`${host}/api/join`, {
              method: req.method,
              headers,
              ...(body ? { body, duplex: 'half' } : {}),
            } as RequestInit)

            const response = await joinWorker.fetch(request, {
              RESEND_API_KEY: env.RESEND_API_KEY,
              RESEND_EMAIL: env.RESEND_EMAIL,
              FROM_EMAIL: env.FROM_EMAIL,
              ALLOWED_ORIGINS: env.ALLOWED_ORIGINS || host,
            })

            res.statusCode = response.status
            response.headers.forEach((value, key) => res.setHeader(key, value))
            res.end(Buffer.from(await response.arrayBuffer()))
          })
        },
      },
    ],
  }
})
