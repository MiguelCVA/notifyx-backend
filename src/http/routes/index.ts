import { Elysia } from 'elysia'

/**
 * User routes
 */
import { createUser } from '@routes/users/createUser'
import { getUserById } from '@routes/users/getUserByID'
import { getAllusers } from '@routes/users/getAllUsers'
import { getUserInfo } from '@routes/users/getUser'

/**
 * Workspace routes
 */

import { createWorkspace } from '@routes/workspaces/createWorkspace'
import { getAllWorkspaces } from '@routes/workspaces/getAllWorkspaces'
import { getWorkspaceById } from '@routes/workspaces/getWorkspaceById'
import { sendNotification } from './notifications/send-notification'

/**
 * Internal routes
 */
import { getAllErrors } from '@routes/internal/errors/errors'
import { getErrorById } from '@routes/internal/errors/getErrorById'
import { generateToken } from '@routes/authorization/generateJwt'

/**
 * Webhook routes
 */
import { registerWebhook } from '@routes/webhooks/register-wehbook'
import { getAllWebhooks } from './webhooks/getAllWebhooks'

/**
 * Export default routes
 */

export const usersRoutes = new Elysia()
  .use(createUser)
  .use(getUserById)
  .use(getAllusers)
  .use(getUserInfo)

export const workspaceRoutes = new Elysia()
  .use(createWorkspace)
  .use(getAllWorkspaces)
  .use(getWorkspaceById)
  .use(sendNotification)

export const internalRoutes = new Elysia()
  .use(getAllErrors)
  .use(getErrorById)
  .use(generateToken)

export const webhookRoutes = new Elysia()
  .use(registerWebhook)
  .use(getAllWebhooks)
