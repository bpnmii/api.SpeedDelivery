import { Request, Response } from 'express'
import z from 'zod'
import { AtualizarEntregaService } from '../services/AtualizarEntregaService'
import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'

export class AtualizarEntregaController {
  constructor(private AtualizarEntregaService: AtualizarEntregaService) {}

  async handle(req: Request, res: Response) {
    const paramsSchema = z.object({
      codigo_operacao: z.coerce.number(),
    })

    const bodySchema = z.object({
      sequencia_entrega: z.number().optional(),
      codigo_cliente: z.number().optional(),
      nome_cliente: z.string().optional(),
      CEP: z.string().optional(),
      endereco: z.string().optional(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      status_entrega: z.nativeEnum(StatusEntregaEnum).optional(),
      status_resultado: z.nativeEnum(StatusResultadoEnum).optional(),
    })

    const { codigo_operacao } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const resultado = await this.AtualizarEntregaService.execute({
      codigo_operacao,
      ...data,
    })
    return res.json(resultado)
  }
}
