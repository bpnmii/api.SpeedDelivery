import AppError from '../../../errors/app-error'
import { MostrarItensPedidoService } from '../services/MostrarItensPedidoService'
import { Request, Response } from 'express'

export class MostrarItensPedidoController {
  constructor(private mostrarItensPedidoService: MostrarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const { codigo_entrega } = req.params

    if (!codigo_entrega) {
      throw new AppError('Código da entrega é obrigatório', 400)
    }

    try {
      const itens = await this.mostrarItensPedidoService.execute(
        Number(codigo_entrega),
      )

      return res.json(itens)
    } catch (error: any) {
      throw new AppError(error.message, 404)
    }
  }
}
