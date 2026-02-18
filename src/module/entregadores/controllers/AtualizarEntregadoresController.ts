import { Request, Response } from 'express'
import z from 'zod'
import { AtualizarEntregadorService } from '../services/AtualizarEntregadoresService'

export class AtualizarEntregadoresController {
  constructor(private AtualizarEntregadorService: AtualizarEntregadorService) {}

  async handle(req: Request, res: Response) {
    const paramsSchema = z.object({
      codigo_entregador: z.coerce.number(),
    })

    const bodySchema = z.object({
      unidade_negocio: z.string().optional(),
      email: z.string().email().optional(),
      senha: z.string().min(6).optional(),
    })

    const { codigo_entregador } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const resultado = await this.AtualizarEntregadorService.execute({
      codigo_entregador,
      ...data,
    })

    return res.json(resultado)
  }
}
