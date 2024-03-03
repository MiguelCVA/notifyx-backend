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

/**
 * Internal routes
 */
import { getAllErrors } from '@routes/internal/errors/errors'
import { getErrorById } from '@routes/internal/errors/getErrorById'
import { generateToken } from '@routes/authorization/generateJwt'

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

export const internalRoutes = new Elysia()
  .use(getAllErrors)
  .use(getErrorById)
  .use(generateToken)
