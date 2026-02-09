import { Request, Response } from 'express'
import { AtualizarItensPedidoController } from '../controllers/AtualizarItensPedidoController'
import { AtualizarItensPedidoService } from '../services/AtualizarItensPedidoService'
import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import { AppDataSource } from '../../../database'

export const AtualizarItensPedidoFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new ItensPedidoRepositories(AppDataSource.manager)
    const Service = new AtualizarItensPedidoService(repository)
    const Controller = new AtualizarItensPedidoController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
