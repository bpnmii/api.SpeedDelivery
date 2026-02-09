import { Request, Response } from 'express'
import z from 'zod'
import { AtualizarItensPedidoService } from '../services/AtualizarItensPedidoService'

export class AtualizarItensPedidoController {
  constructor(
    private atualizarItensPedidoService: AtualizarItensPedidoService,
  ) {}

  async handle(req: Request, res: Response) {
    const paramsSchema = z.object({
      codigo: z.coerce.number(),
    })

    const bodySchema = z.object({
      codigo_entrega: z.number().optional(),
      descricao_produto: z.string().optional(),
      embalagem: z.string().optional(),
      quantidade: z.number().optional(),
    })

    const { codigo } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const resultado = await this.atualizarItensPedidoService.execute({
      codigo,
      ...data,
    })
    return res.json(resultado)
  }
}
