import AppError from '../../../errors/app-error'
import { ListarItensPedidoService } from '../services/ListarItensPedidoService'
import { Request, Response } from 'express'

export class ListarItensPedidoController {
  constructor(private listarItensPedidoService: ListarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const clientes = await this.listarItensPedidoService.execute()

    if (!clientes) {
      throw new AppError('Nenhuma entrega encontrado', 401)
    }

    res.json(clientes)
  }
}
