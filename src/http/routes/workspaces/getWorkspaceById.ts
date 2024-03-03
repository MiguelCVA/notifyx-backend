import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { WorkspaceNotExistsError } from '../errors/workspace-not-exists'

export const getWorkspaceByIdFunction = async (
  id: string | undefined,
  userId: string | undefined,
) => {
  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!workspace) throw new Error()

    return workspace
  } catch (error) {
    throw new WorkspaceNotExistsError()
  }
}

export const getWorkspaceById = new Elysia()
  .use(authentication)
  .get('/workspaces/:id', async ({ getAuthorization, params }) => {
    const id = params.id
    const user = await getAuthorization()

    const workspace = await getWorkspaceByIdFunction(id, user.uid)

    return Response.json(workspace, { status: 200 })
  })
