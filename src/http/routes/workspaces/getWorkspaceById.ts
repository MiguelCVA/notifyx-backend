import { Elysia } from 'elysia'
import { authentication } from '../../authentication'
import { WorkspaceNotExistsError } from '../errors/workspace-not-exists'
import { db } from '@/db/prisma'

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

    const notifications = await db.notify.findMany({
      where: {
        workspaceId: id,
      },
    })

    const webhooks = await db.webhook.findMany({
      where: {
        workspaces: {
          some: {
            id,
          },
        },
      },
    })

    if (!workspace) throw new Error()

    return {
      workspace,
      notifications,
      webhooks,
    }
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
