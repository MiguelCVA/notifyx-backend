import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'

export const getAllusers = new Elysia()
  .use(authentication)
  .get('/users', async ({ getAuthorization }) => {
    await getAuthorization()

    const user = await db.user.findMany()

    return Response.json(user, { status: 200 })
  })
