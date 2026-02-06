import { Request, Response } from 'express'
import { AtualizarEntregaController } from '../controllers/AtualizarEntregaController'
import { AtualizarEntregaService } from '../services/AtualizarEntregaService'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import { AppDataSource } from '../../../database'

export const AtualizarEntregaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new AtualizarEntregaService(repository)
    const Controller = new AtualizarEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
