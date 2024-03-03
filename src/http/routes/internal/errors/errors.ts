import { Elysia } from 'elysia'
import { db } from '../../../../db/prisma'

export const getAllErrors = new Elysia().get('/errors', async () => {
  const errors = await db.errors.findMany()

  return Response.json(errors, { status: 200 })
})
