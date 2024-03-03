import { Elysia } from 'elysia'

import { authentication } from '../../authentication'
import { getAllWorkspacesFunction } from '../workspaces/getAllWorkspaces'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { UserNotFound } from '../errors'
import { db } from '@/db/prisma'
import { getAllWebhooksFunction } from '../webhooks/getAllWebhooks'

export const getUserInfoFunction = async (id: string | undefined) => {
  try {
    const User = await db.user.findUnique({
      where: { id },
    })

    if (!User) throw new Error()
    return User
  } catch (error) {
    throw new UserNotFound()
  }
}

export const getUserInfo = new Elysia()
  .use(authentication)
  .get('/me', async ({ getAuthorization }) => {
    try {
      const authorization = await getAuthorization()

      const user = await getUserInfoFunction(authorization.uid)
      const workspaces = await getAllWorkspacesFunction(authorization.uid)
      const webhooks = await getAllWebhooksFunction(authorization.uid)

      return Response.json(
        {
          user,
          workspaces,
          webhooks,
        },
        { status: 200 },
      )
    } catch (error) {
      throw new UnauthorizedError()
    }
  })
