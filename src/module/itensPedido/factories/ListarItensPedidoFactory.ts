import { Request, Response } from 'express'
import { ListarItensPedidoController } from '../controllers/ListarItensPedidoController'
import { ListarItensPedidoService } from '../services/ListarItensPedidoService'
import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import { AppDataSource } from '../../../database'

export const ListarItensPedidoFactory = async (req: Request, res: Response) => {
  try {
    const repository = new ItensPedidoRepositories(AppDataSource.manager)
    const Service = new ListarItensPedidoService(repository)
    const Controller = new ListarItensPedidoController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
