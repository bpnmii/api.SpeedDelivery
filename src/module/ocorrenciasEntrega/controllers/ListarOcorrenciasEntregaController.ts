import AppError from '../../../errors/app-error'
import { ListarOcorrenciasEntregaService } from '../services/ListarOcorrenciasEntregaService'
import { Request, Response } from 'express'

export class ListarOcorrenciasEntregaController {
  constructor(
    private ListarOcorrenciasEntregaService: ListarOcorrenciasEntregaService,
  ) {}

  async handle(req: Request, res: Response) {
    const ocorrencias = await this.ListarOcorrenciasEntregaService.execute()

    if (!ocorrencias) {
      throw new AppError('Nenhuma ocorrencia encontrado', 401)
    }

    res.json(ocorrencias)
  }
}
