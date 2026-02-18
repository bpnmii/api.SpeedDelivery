import { Request, Response } from 'express'
import { ListarEntregadoresController } from '../controllers/ListarEntregadoresController'
import { ListarEntregadoresService } from '../services/ListarEntregadoresService'
import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import { AppDataSource } from '../../../database'

export const ListarEntregadoresFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new EntregadoresRepositories(AppDataSource.manager)
    const Service = new ListarEntregadoresService(repository)
    const Controller = new ListarEntregadoresController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
