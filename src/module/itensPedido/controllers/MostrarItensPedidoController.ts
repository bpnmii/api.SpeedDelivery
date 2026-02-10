import AppError from '../../../errors/app-error'
import { MostrarItensPedidoService } from '../services/MostrarItensPedidoService'
import { Request, Response } from 'express'

export class MostrarEntregaController {
  constructor(private MostrarItensPedidoService: MostrarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const { codigo_entrega } = req.params

    if (!codigo_entrega) {
      throw new AppError('Código da operação é obrigatório', 400)
    }

    const entrega = await this.MostrarItensPedidoService.execute({
      codigo_entrega: Number(codigo_entrega),
    })

    if (!entrega) {
      throw new AppError('Entrega não encontrada', 404)
    }

    return res.json(entrega)
  }
}
