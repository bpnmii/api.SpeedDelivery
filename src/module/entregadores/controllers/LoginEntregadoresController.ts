import { Request, Response } from 'express'
import z from 'zod'
import { LoginService } from '../services/LoginEntregadoresService'

export class LoginController {
  constructor(private loginService: LoginService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      senha: z.string().min(6),
    })

    const { email, senha } = bodySchema.parse(req.body)

    const result = await this.loginService.execute({ email, senha })

    return res.status(200).json(result)
  }
}
