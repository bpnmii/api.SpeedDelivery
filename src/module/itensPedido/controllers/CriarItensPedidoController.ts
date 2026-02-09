import { Request, Response } from 'express'
import z from 'zod'
import { CriarItensPedidoService } from '../services/CriarItensPedidoService'

export class CriarItensPedidoController {
  constructor(private criarItensPedidoService: CriarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo_entrega: z.number(),
      descricao_produto: z.string(),
      embalagem: z.string(),
      quantidade: z.number(),
    })

    const data = bodySchema.parse(req.body)

    const itensPedido = await this.criarItensPedidoService.execute(data)

    return res.status(201).json(itensPedido)
  }
}
