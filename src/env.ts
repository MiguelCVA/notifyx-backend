import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  JWT_SECRET_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
