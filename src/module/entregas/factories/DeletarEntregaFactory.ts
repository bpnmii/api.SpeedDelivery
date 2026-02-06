import { Request, Response } from 'express'
import { DeletarEntregaController } from '../controllers/DeletarEntregaController'
import { DeletarEntregaService } from '../services/DeletarEntregaService'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import { AppDataSource } from '../../../database'

export const DeletarEntregaFactory = async (req: Request, res: Response) => {
  try {
    const repository = new EntregasRepositories(AppDataSource.manager)
    const Service = new DeletarEntregaService(repository)
    const Controller = new DeletarEntregaController(Service)

    await Controller.handle(req, res)
  } catch (error: any) {
    return res.status(error?.statusCode || 400).json(error)
  }
}
