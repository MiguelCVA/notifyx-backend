import { Elysia } from 'elysia'
// import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { WorkspaceNotExistsError } from '../errors/workspace-not-exists'
import { adb } from '@/db/andromeda'

export const getAllWorkspacesFunction = async (userId: string | undefined) => {
  try {
    const workspace = await adb.workspace.findMany(userId)

    if (!workspace) throw new Error()

    return workspace
  } catch (error) {
    throw new UnauthorizedError()
  }
}

export const getAllWorkspaces = new Elysia()
  .use(authentication)
  .get('/workspaces', async ({ getAuthorization }) => {
    try {
      const user = await getAuthorization()

      const workspace = await getAllWorkspacesFunction(user.uid)

      return Response.json(workspace, { status: 200 })
    } catch (error) {
      throw new WorkspaceNotExistsError()
    }
  })
