import { Request, Response } from 'express'
import { MostrarItensPedidoController } from '../controllers/MostrarItensPedidoController'
import { MostrarItensPedidoService } from '../services/MostrarItensPedidoService'
import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import { AppDataSource } from '../../../database'

export const MostrarItensPedidoFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const repository = new ItensPedidoRepositories(AppDataSource.manager)
    const Service = new MostrarItensPedidoService(repository)
    const Controller = new MostrarItensPedidoController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
