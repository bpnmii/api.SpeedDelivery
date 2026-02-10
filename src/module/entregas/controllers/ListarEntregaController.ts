import AppError from '../../../errors/app-error'
import { ListarEntregaService } from '../services/ListarEntregaService'
import { Request, Response } from 'express'

export class ListarEntregaController {
  constructor(private listarEntregaService: ListarEntregaService) {}

  async handle(req: Request, res: Response) {
    const entregas = await this.listarEntregaService.execute()

    if (!entregas) {
      throw new AppError('Nenhuma entrega encontrado', 401)
    }

    res.json(entregas)
  }
}
