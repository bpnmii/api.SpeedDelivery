import { Request, Response } from 'express'
import { ListarOcorrenciasEntregaController } from '../controllers/ListarOcorrenciasEntregaController'
import { ListarOcorrenciasEntregaService } from '../services/ListarOcorrenciasEntregaService'
import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'
import { AppDataSource } from '../../../database'

export const ListarOcorrenciasEntregaFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new OcorrenciasEntregaRepositories(AppDataSource.manager)
    const Service = new ListarOcorrenciasEntregaService(repository)
    const Controller = new ListarOcorrenciasEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
