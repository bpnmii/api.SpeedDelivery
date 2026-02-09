import { Request, Response } from 'express'
import { ListarOcorrenciaController } from '../controllers/ListarOcorrenciaController'
import { ListarOcorrenciaService } from '../services/ListarOcorrenciaService'
import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import { AppDataSource } from '../../../database'

export const ListarOcorrenciaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new OcorrenciasRepositories(AppDataSource.manager)
    const Service = new ListarOcorrenciaService(repository)
    const Controller = new ListarOcorrenciaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
