import AppError from '../../../errors/app-error'
import { MostrarEntregaEntregadorService } from '../services/MostrarEntregaEntregadorService'
import { Request, Response } from 'express'

export class MostrarEntregaEntregadorController {
  constructor(private mostrarEntregaService: MostrarEntregaEntregadorService) {}

  async handle(req: Request, res: Response) {
    const { codigo_entregador } = req.params

    if (!codigo_entregador) {
      throw new AppError('Código do entregador é obrigatório', 400)
    }

    const entrega = await this.mostrarEntregaService.execute({
      codigo_entregador: Number(codigo_entregador),
    })

    if (!entrega) {
      throw new AppError('Entrega não encontrada', 404)
    }

    return res.json(entrega)
  }
}
