import { Elysia } from 'elysia'
import { db } from '@/db/prisma'
import { InternalApplicationError } from '@routes/errors'

export const getErrorById = new Elysia().get(
  '/error/:id',
  async ({ params }) => {
    try {
      const id = params.id
      const error = await db.errors.findUnique({
        where: {
          id,
        },
      })

      if (!error) throw new Error()

      return Response.json(error, { status: 200 })
    } catch (error) {
      throw new InternalApplicationError()
    }
  },
)
