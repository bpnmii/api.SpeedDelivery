import { Request, Response } from 'express'
import { CriarOcorrenciaService } from '../services/CriarOcorrenciaService'
import { CriarOcorrenciaController } from '../controllers/CriarOcorrenciaController'
import { AppDataSource } from '../../../database'

import AppError from '../../../errors/app-error'
import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'

export const CriarOcorrenciaFactory = async (req: Request, res: Response) => {
  try {
    const Repository = new OcorrenciasRepositories(AppDataSource.manager)
    const Service = new CriarOcorrenciaService(Repository)
    const Controller = new CriarOcorrenciaController(Service)

    await Controller.handle(req, res)
  } catch (error) {
    console.log('CriarOcorrenciaFactory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
