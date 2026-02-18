import { Request, Response } from 'express'
import z from 'zod'
import { CriarEntregadorService } from '../services/CriarEntregadoresService'

export class CriarEntregadorController {
  constructor(private CriarEntregadoresService: CriarEntregadorService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      unidade_negocio: z.string(),
      email: z.string().email(),
      senha: z.string().min(6),
    })

    const data = bodySchema.parse(req.body)

    const entregador = await this.CriarEntregadoresService.execute(data)

    return res.status(201).json(entregador)
  }
}
