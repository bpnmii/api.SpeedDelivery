import { Request, Response } from 'express'
import z from 'zod'
import { CriarEntregaService } from '../services/CriarEntregaService'
import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'

export class CriarEntregaController {
  constructor(private criarEntregaService: CriarEntregaService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      sequencia_entrega: z.number(),
      codigo_cliente: z.number(),
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
