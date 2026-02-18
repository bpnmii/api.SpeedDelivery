import { Request, Response } from 'express'
import { DeletarEntregadorController } from '../controllers/DeletarEntregadoresController'
import { DeletarEntregadorService } from '../services/DeletarEntregadoresService'
import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import { AppDataSource } from '../../../database'

export const DeletarEntregadoresFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new EntregadoresRepositories(AppDataSource.manager)
    const Service = new DeletarEntregadorService(repository)
    const Controller = new DeletarEntregadorController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
