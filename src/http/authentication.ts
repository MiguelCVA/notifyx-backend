import { Elysia, t, Static } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '@/env'
import {
  UnauthorizedError,
  UserNotFound,
  WorkspaceNotExistsError,
  InternalApplicationError,
} from '@routes/errors'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  uid: t.Optional(t.String()),
})
export type JwtPayload = Static<typeof jwtPayloadSchema>

export const authentication = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    USER_NOT_FOUND: UserNotFound,
    WORKSPACE_NOT_EXISTS: WorkspaceNotExistsError,
    INTERNAL_APPLICATION_ERROR: InternalApplicationError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return {
          code,
          message: error.message,
          errorId: error.errorId,
        }
      case 'USER_NOT_FOUND':
        set.status = 404
        return {
          code,
          message: error.message,
          errorId: error.errorId,
        }
      case 'WORKSPACE_NOT_EXISTS':
        set.status = 404
        return {
          code,
          message: error.message,
          errorId: error.errorId,
        }
      case 'INTERNAL_APPLICATION_ERROR':
        set.status = 500
        return {
          code,
          message: error.message,
          errorId: error.errorId,
        }
    }
  })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
      exp: '7d',
    }),
  )
  .derive(({ headers, jwt }) => {
    return {
      getAuthorization: async () => {
        const { authorization } = headers as {
          authorization: string
        }

        const token = authorization?.split(' ')[1]
        const payload = await jwt.verify(token)

        if (!payload) throw new UnauthorizedError()
        return payload
      },
      generateJwt: async (payload: Static<typeof jwtPayloadSchema>) => {
        return await jwt.sign(payload)
      },
    }
  })
// .use(cookie)
// .derive(({ cookie, jwt, setCookie, removeCookie, generateJwt }) => {
//   return {
//     getCurrentUser: async () => {
//       const payload = await jwt.verify(cookie._u)

//       if (!payload) {
//         throw new UnauthorizedError()
//       }

//       return payload
//     },
//     signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
//       setCookie('_u', await generateJwt(payload), {
//         httpOnly: true,
//         maxAge: 7 * 86400,
//         path: '/',
//       })
//     },
//     signOut: () => {
//       removeCookie('_u')
//     },
//   }
// })
