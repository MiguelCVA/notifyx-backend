import { Elysia } from 'elysia'
import { JwtPayload, authentication } from '../../authentication'
import { InternalApplicationError } from '../errors'

export const generateToken = new Elysia()
  .use(authentication)
  .post('/token', async ({ generateJwt, body }) => {
    try {
      const jwtPayload = body as JwtPayload

      const token = await generateJwt(jwtPayload)

      if (!jwtPayload || !jwtPayload.sub || !jwtPayload.uid) {
        throw new Error()
      }

      return Response.json(
        {
          token,
        },
        { status: 201 },
      )
    } catch (error) {
      throw new InternalApplicationError()
    }
  })
