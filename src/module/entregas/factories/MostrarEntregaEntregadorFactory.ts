import { Request, Response } from 'express'
import { MostrarEntregaEntregadorService } from '../services/MostrarEntregaEntregadorService'
import { MostrarEntregaEntregadorController } from '../controllers/MostrarEntregaEntregadorController'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import { AppDataSource } from '../../../database'

export const MostrarEntregaEntregadorFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new MostrarEntregaEntregadorService(repository)
    const Controller = new MostrarEntregaEntregadorController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
