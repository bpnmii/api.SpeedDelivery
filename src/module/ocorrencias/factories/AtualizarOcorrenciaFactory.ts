import { Request, Response } from 'express'
import { AtualizarOcorrenciaController } from '../controllers/AtualizarOcorrenciaController'
import { AtualizarOcorrenciaService } from '../services/AtualizarOcorrenciaService'
import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import { AppDataSource } from '../../../database'

export const AtualizarOcorrenciaFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new OcorrenciasRepositories(AppDataSource.manager)
    const Service = new AtualizarOcorrenciaService(repository)
    const Controller = new AtualizarOcorrenciaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
