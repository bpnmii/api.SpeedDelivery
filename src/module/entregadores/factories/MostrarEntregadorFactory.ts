import { Request, Response } from 'express'
import { MostrarEntregadorController } from '../controllers/MostrarEntregadorController'
import { MostrarEntregadorService } from '../services/MostrarEntregadorService'
import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import { AppDataSource } from '../../../database'

export const MostrarEntregadorFactory = async (req: Request, res: Response) => {
  try {
    const repository = new EntregadoresRepositories(AppDataSource.manager)
    const Service = new MostrarEntregadorService(repository)
    const Controller = new MostrarEntregadorController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
