import { Request, Response } from 'express'
import { ListarEntregaController } from '../controllers/ListarEntregaController'
import { ListarEntregaService } from '../services/ListarEntregaService'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import { AppDataSource } from '../../../database'

export const ListarEntregaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new ListarEntregaService(repository)
    const Controller = new ListarEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
