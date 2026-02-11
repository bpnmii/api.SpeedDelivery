import AppError from '../../../errors/app-error'
import { MostrarOcorrenciasEntregaService } from '../services/MostrarOcorrenciasEntregaService'
import { Request, Response } from 'express'

export class MostrarOcorrenciasEntregaController {
  constructor(
    private MostrarOcorrenciasEntregaService: MostrarOcorrenciasEntregaService,
  ) {}

  async handle(req: Request, res: Response) {
    const { codigo_entrega } = req.params

    if (!codigo_entrega) {
      throw new AppError('Código da entrega é obrigatório', 400)
    }

    try {
      const itens = await this.MostrarOcorrenciasEntregaService.execute(
        Number(codigo_entrega),
      )

      return res.json(itens)
    } catch (error: any) {
      throw new AppError(error.message, 404)
    }
  }
}
