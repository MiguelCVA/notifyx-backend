import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { InternalApplicationError } from '../errors'

export const getAllWebhooksFunction = async (userId: string | undefined) => {
  try {
    const webhooks = await db.webhook.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        url: true,
      },
    })

    if (!webhooks) throw new Error()

    return webhooks
  } catch (error) {
    throw new UnauthorizedError()
  }
}

export const getAllWebhooks = new Elysia()
  .use(authentication)
  .get('/webhooks', async ({ getAuthorization }) => {
    try {
      const user = await getAuthorization()

      const workspace = await getAllWebhooksFunction(user.uid)

      return Response.json(workspace, { status: 200 })
    } catch (error) {
      throw new InternalApplicationError()
    }
  })
