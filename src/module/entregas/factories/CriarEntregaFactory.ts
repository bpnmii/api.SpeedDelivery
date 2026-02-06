import { Request, Response } from 'express'
import { CriarEntregaService } from '../services/CriarEntregaService'
import { CriarEntregaController } from '../controllers/CriarEntregaController'
import { AppDataSource } from '../../../database'

import AppError from '../../../errors/app-error'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

export const CriarEntregaFactory = async (req: Request, res: Response) => {
  try {
    const Repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new CriarEntregaService(Repository)
    const Controller = new CriarEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error) {
    console.log('criarUsuarioFactory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
