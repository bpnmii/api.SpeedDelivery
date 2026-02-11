import { Request, Response } from 'express'
import { MostrarOcorrenciasEntregaController } from '../controllers/MostrarOcorrenciasEntregaController'
import { MostrarOcorrenciasEntregaService } from '../services/MostrarOcorrenciasEntregaService'
import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'
import { AppDataSource } from '../../../database'

export const MostrarOcorrenciasEntregaFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new OcorrenciasEntregaRepositories(AppDataSource.manager)
    const Service = new MostrarOcorrenciasEntregaService(repository)
    const Controller = new MostrarOcorrenciasEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
