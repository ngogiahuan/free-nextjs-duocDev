import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
})

if (!configProject.success) {
  throw new Error('Invalid config in .env file')
}

const envConfig = configProject.data
export default envConfig
