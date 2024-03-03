import { Elysia } from 'elysia'
import { authentication } from '../../authentication'
import { getUserInfoFunction } from './getUser'

export const getUserById = new Elysia()
  .use(authentication)
  .get('/user/:id', async ({ params, getAuthorization }) => {
    await getAuthorization()

    const id = params.id as string

    const user = await getUserInfoFunction(id)

    return Response.json(user, { status: 200 })
  })
