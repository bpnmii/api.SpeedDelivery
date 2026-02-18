import AppError from '../../../errors/app-error'
import { ListarEntregadoresService } from '../services/ListarEntregadoresService'
import { Request, Response } from 'express'

export class ListarEntregadoresController {
  constructor(private ListarEntregadoresService: ListarEntregadoresService) {}

  async handle(req: Request, res: Response) {
    const entregadores = await this.ListarEntregadoresService.execute()

    if (!entregadores) {
      throw new AppError('Nenhum entregador encontrado', 401)
    }

    res.json(entregadores)
  }
}
