import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'

import { authentication } from './authentication'
import {
  internalRoutes,
  usersRoutes,
  webhookRoutes,
  workspaceRoutes,
} from '@routes/index'

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['content-type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) {
          return false
        }

        return true
      },
    }),
  )
  .use(authentication)
  .use(usersRoutes)
  .use(workspaceRoutes)
  .use(internalRoutes)
  .use(webhookRoutes)

app.listen(3333)

console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
)
