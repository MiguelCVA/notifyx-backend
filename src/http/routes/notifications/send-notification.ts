import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { InternalApplicationError } from '../errors'

import { Notify } from '@prisma/client'

export const sendNotificationToWebhooksInBackground = async (
  workspaceId: string,
  notification: Notify,
) => {
  const webhooks = await db.webhook.findMany({
    where: {
      workspaces: {
        some: {
          id: workspaceId,
        },
      },
    },
  })

  if (webhooks) {
    webhooks.forEach(async (webhook) => {
      try {
        await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: notification.id,
            name: notification.name,
            description: notification.description,
            body: notification.body,
            icon: notification.icon,
            provider: notification.provider,
            workspace: notification.workspaceId,
            createdAt: notification.createdAt,
          }),
        })
      } catch (error) {
        console.error(`Failed to send webhook to ${webhook.url}:`, error)
      }
    })
  }
}

export const SendNotificationFunction = async ({
  name,
  description,
  icon,
  provider,
  body,
  workspaceId,
}: {
  name: string
  description: string | null
  icon: string | null
  provider: string
  body: string
  workspaceId: string
}) => {
  try {
    if (!name || !body || !provider || !workspaceId) throw new Error()
    const newNotification = await db.notify.create({
      data: {
        name,
        description,
        body,
        icon,
        provider,
        workspaceId,
      },
    })

    if (newNotification) {
      sendNotificationToWebhooksInBackground(workspaceId, newNotification)
    }

    return newNotification
  } catch (error) {
    throw new InternalApplicationError()
  }
}

export const sendNotification = new Elysia()
  .use(authentication)
  .post('/notify', async ({ getAuthorization, body }) => {
    try {
      const user = await getAuthorization()
      const { name, description, icon, provider, ...p } = body as Notify
      if (!user.wid) throw new InternalApplicationError()

      const newNotify = await SendNotificationFunction({
        name,
        description,
        body: p.body,
        provider,
        icon,
        workspaceId: user.wid,
      })

      return Response.json(
        { status: 'Em envio', notification: newNotify },
        { status: 201 },
      )
    } catch (error) {
      throw new InternalApplicationError()
    }
  })
