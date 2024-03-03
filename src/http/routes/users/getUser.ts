import { Elysia } from 'elysia'

import { authentication } from '../../authentication'
import { UserNotFound } from '../errors/user-not-found-error'
import { getAllWorkspacesFunction } from '../workspaces/getAllWorkspaces'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { adb } from '@/db/andromeda'

export const getUserInfoFunction = async (id: string | undefined) => {
  try {
    const User = await adb.user.findUnique({ id })

    if (!User) throw new Error()
    return User
  } catch (error) {
    throw new UserNotFound()
  }
}

export const getUserInfo = new Elysia()
  .use(authentication)
  .get('/me', async ({ getAuthorization }) => {
    try {
      const user = await getAuthorization()

      const User = await getUserInfoFunction(user.uid)

      const workspaces = await getAllWorkspacesFunction(user.uid)

      return Response.json(
        {
          user: User,
          workspaces,
        },
        { status: 200 },
      )
    } catch (error) {
      throw new UnauthorizedError()
    }
  })
