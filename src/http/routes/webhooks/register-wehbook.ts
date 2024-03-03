import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { InternalApplicationError } from '../errors'
import { Webhook } from '@prisma/client'

export const registerWebhookFunction = async ({
  name,
  url,
  userId,
}: {
  name: string
  url: string
  userId: string
}) => {
  try {
    if (!name || !url || !userId) throw new Error()
    const registerWebhoook = await db.webhook.create({
      data: {
        name,
        url,
        userId,
      },
    })

    return registerWebhoook
  } catch (error) {
    throw new InternalApplicationError()
  }
}

export const registerWebhook = new Elysia()
  .use(authentication)
  .post('/webhook', async ({ getAuthorization, body }) => {
    const authorization = await getAuthorization()
    const { name, url } = body as Webhook

    const webhook = await registerWebhookFunction({
      name,
      url,
      userId: authorization.uid as string,
    })

    return Response.json(webhook, { status: 201 })
  })
