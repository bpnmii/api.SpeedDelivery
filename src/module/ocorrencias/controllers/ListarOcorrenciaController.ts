import AppError from '../../../errors/app-error'
import { ListarOcorrenciaService } from '../services/ListarOcorrenciaService'
import { Request, Response } from 'express'

export class ListarOcorrenciaController {
  constructor(private ListarOcorrenciaService: ListarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const ocorrencias = await this.ListarOcorrenciaService.execute()

    if (!ocorrencias) {
      throw new AppError('Nenhuma ocorrencia encontrado', 401)
    }

    res.json(ocorrencias)
  }
}
