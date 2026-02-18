import { Request, Response } from 'express'
import { AtualizarEntregadoresController } from '../controllers/AtualizarEntregadoresController'
import { AtualizarEntregadorService } from '../services/AtualizarEntregadoresService'
import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import { AppDataSource } from '../../../database'

export const AtualizarEntregadoresFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new EntregadoresRepositories(AppDataSource.manager)
    const Service = new AtualizarEntregadorService(repository)
    const Controller = new AtualizarEntregadoresController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
