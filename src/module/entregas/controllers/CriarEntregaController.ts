import { Request, Response } from 'express'
import z from 'zod'
import { CriarEntregaService } from '../services/CriarEntregaService'

export class CriarEntregaController {
  constructor(private criarEntregaService: CriarEntregaService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo_cliente: z.number(),
      codigo_entregador: z.number(),
      nome_cliente: z.string(),
      CEP: z.string(),
      endereco: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      estado: z.string(),
    })

    const data = bodySchema.parse(req.body)

    const entrega = await this.criarEntregaService.execute(data)

    return res.status(201).json(entrega)
  }
}
