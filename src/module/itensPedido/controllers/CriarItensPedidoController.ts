import { Request, Response } from 'express'
import z from 'zod'
import { CriarItensPedidoService } from '../services/CriarItensPedidoService'

export class CriarItensPedidoController {
  constructor(private criarItensPedidoService: CriarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo: z.number(),
      codigo_entrega: z.number(),
      descricao_produto: z.string(),
      embalagem: z.string(),
      quantidade: z.number(),
    })

    const { codigo, codigo_entrega, descricao_produto, embalagem, quantidade } =
      bodySchema.parse(req.body)

    const entrega = await this.criarItensPedidoService.execute({
      codigo,
      codigo_entrega,
      descricao_produto,
      embalagem,
      quantidade,
    })

    return res.status(201).json(entrega)
  }
}
