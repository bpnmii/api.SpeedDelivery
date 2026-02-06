import { env } from '@/env'

const authConfig = {
  secret: env.SECRET_JWT,
  expiresIn: '356d',
}

export default authConfig
