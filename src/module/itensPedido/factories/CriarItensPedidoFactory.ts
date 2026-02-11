import { Request, Response } from 'express'
import { CriarItensPedidoService } from '../services/CriarItensPedidoService'
import { CriarItensPedidoController } from '../controllers/CriarItensPedidoController'
import { AppDataSource } from '../../../database'

import AppError from '../../../errors/app-error'
import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'

export const CriarItensPedidoFactory = async (req: Request, res: Response) => {
  try {
    const Repository = new ItensPedidoRepositories(AppDataSource.manager)
    const Service = new CriarItensPedidoService(Repository)
    const Controller = new CriarItensPedidoController(Service)

    await Controller.handle(req, res)
  } catch (error) {
    console.log('CriarItensPedidoFactory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
