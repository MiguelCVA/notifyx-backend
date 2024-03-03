import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'

export type CreateWorkspace = {
  name: string
}

export const createWorkspace = new Elysia()
  .use(authentication)
  .post('/workspace', async ({ body, getAuthorization }) => {
    const user = await getAuthorization()
    const { name } = body as CreateWorkspace

    const newWorkspace = await db.workspace.create({
      data: {
        name,
        slug: name
          .toLowerCase()
          .replace(' ', '-')
          .replace(/[^a-zA-Z0-9-]/g, ''),
        userId: user.uid,
      },
    })

    return Response.json(newWorkspace, { status: 201 })
  })
