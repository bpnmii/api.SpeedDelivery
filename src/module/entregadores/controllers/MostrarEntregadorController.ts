import AppError from '../../../errors/app-error'
import { MostrarEntregadorService } from '../services/MostrarEntregadorService' // Corrigido para Mostrar
import { Request, Response } from 'express'

export class MostrarEntregadorController {
  constructor(private mostrarEntregadorService: MostrarEntregadorService) {}

  async handle(req: Request, res: Response) {
    const { codigo_entregador } = req.params

    if (!codigo_entregador) {
      throw new AppError('Código do entregador é obrigatório', 400)
    }

    const entregador = await this.mostrarEntregadorService.execute({
      codigo_entregador: Number(codigo_entregador),
    })

    if (!entregador) {
      throw new AppError('Entregador não encontrado', 404)
    }

    return res.json(entregador)
  }
}
