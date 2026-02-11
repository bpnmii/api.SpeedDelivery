import { Request, Response } from 'express'
import { CriarOcorrenciasEntregaService } from '../services/CriarOcorrenciasEntregaService'
import { CriarOcorrenciasEntregaController } from '../controllers/CriarOcorrenciasEntregaController'
import { AppDataSource } from '../../../database'

import AppError from '../../../errors/app-error'
import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'

export const CriarOcorrenciasEntregaFactory = async (
  req: Request,
  res: Response,
) => {
  try {
    const Repository = new OcorrenciasEntregaRepositories(AppDataSource.manager)
    const Service = new CriarOcorrenciasEntregaService(Repository)
    const Controller = new CriarOcorrenciasEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error) {
    console.log('CriarOcorrenciasEntregaFactory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
