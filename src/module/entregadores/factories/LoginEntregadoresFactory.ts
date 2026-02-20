import { AppDataSource } from '@/database'
import { EntregadoresRepositories } from '@/database/repositories/EntregadoresRepositories'
import { Request, Response } from 'express'
import { LoginService } from '../services/LoginEntregadoresService'
import { LoginController } from '../controllers/LoginEntregadoresController'
import AppError from '@/errors/app-error'

export const loginFactory = async (req: Request, res: Response) => {
  try {
    const usuariosRepository = new EntregadoresRepositories(
      AppDataSource.manager,
    )
    const loginService = new LoginService(usuariosRepository)
    const loginController = new LoginController(loginService)

    await loginController.handle(req, res)
  } catch (error) {
    console.log('loginFactory', error)

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }
}
