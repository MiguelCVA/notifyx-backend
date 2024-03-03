import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { InternalApplicationError } from '../errors'

import { Notify } from '@prisma/client'

export const SendNotificationFunction = async ({
  name,
  description,
  body,
  icon,
  provider,
  workspaceId,
}: Notify) => {
  try {
    if (!name || !description || !body || !provider || !workspaceId)
      throw new Error()
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

    return newNotification
  } catch (error) {
    throw new InternalApplicationError()
  }
}

export const sendNotification = new Elysia()
  .use(authentication)
  .post('/notify', async ({ getAuthorization, body }) => {
    const user = await getAuthorization()
    const { name, description, icon, provider, ...p } = body as Notify
    if (!user.wid) throw new InternalApplicationError()

    const newNotify = await SendNotificationFunction({
      name,
      description,
      body: p.body,
      icon,
      provider,
      workspaceId: user.wid,
    })

    return Response.json(newNotify, { status: 201 })
  })
