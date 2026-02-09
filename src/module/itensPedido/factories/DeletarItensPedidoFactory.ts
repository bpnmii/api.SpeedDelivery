import { Request, Response } from 'express'
import { DeletarItensPedidoController } from '../controllers/DeletarItensPedidoController'
import { DeletarItensPedidoService } from '../services/DeletarItensPedidoService'
import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import { AppDataSource } from '../../../database'

export const DeletarItensPedidoFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new ItensPedidoRepositories(AppDataSource.manager)
    const Service = new DeletarItensPedidoService(repository)
    const Controller = new DeletarItensPedidoController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
