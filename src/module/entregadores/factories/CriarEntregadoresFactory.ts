import { Request, Response } from 'express'
import { CriarEntregadorService } from '../services/CriarEntregadoresService'
import { CriarEntregadorController } from '../controllers/CriarEntregadoresController'
import { AppDataSource } from '../../../database'

import AppError from '../../../errors/app-error'
import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'

export const CriarEntregadoresFactory = async (req: Request, res: Response) => {
  try {
    const Repository = new EntregadoresRepositories(AppDataSource.manager)
    const Service = new CriarEntregadorService(Repository)
    const Controller = new CriarEntregadorController(Service)

    await Controller.handle(req, res)
  } catch (error) {
    console.log('CriarEntregador  Factory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
