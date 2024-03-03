import { Elysia } from 'elysia'
import { db } from '../../../db/prisma'
import { authentication } from '../../authentication'
import { InternalApplicationError } from '../errors'

export type CreateUser = {
  name: string
  email: string
}

export const createUserFunction = async (name: string, email: string) => {
  try {
    if (!name || !email) throw new Error()
    const newUser = await db.user.create({
      data: {
        name,
        email,
      },
    })

    return newUser
  } catch (error) {
    throw new InternalApplicationError()
  }
}

export const createUser = new Elysia()
  .use(authentication)
  .post('/user', async (ctx) => {
    const { name, email } = ctx.body as CreateUser

    const newUser = await createUserFunction(name, email)

    return Response.json(newUser, { status: 201 })
  })
