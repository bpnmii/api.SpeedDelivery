import { Request, Response } from 'express'
import { MostrarEntregaController } from '../controllers/MostrarEntregaController'
import { MostrarEntregaService } from '../services/MostrarEntregaService'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import { AppDataSource } from '../../../database'

export const MostrarEntregaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new MostrarEntregaService(repository)
    const Controller = new MostrarEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
