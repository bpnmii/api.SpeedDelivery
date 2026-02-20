import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'default_secret'

interface JwtPayload {
  id: number
  email: string
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload
    req.user = decoded

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
