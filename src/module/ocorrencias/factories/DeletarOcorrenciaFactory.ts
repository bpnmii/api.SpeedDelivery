import { Request, Response } from 'express'
import { DeletarOcorrenciaController } from '../controllers/DeletarOcorrenciaController'
import { DeletarOcorrenciaService } from '../services/DeletarOcorrenciaService'
import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import { AppDataSource } from '../../../database'

export const DeletarOcorrenciaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new OcorrenciasRepositories(AppDataSource.manager)
    const Service = new DeletarOcorrenciaService(repository)
    const Controller = new DeletarOcorrenciaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
