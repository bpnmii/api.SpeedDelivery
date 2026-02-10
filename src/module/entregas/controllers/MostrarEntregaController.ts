import AppError from '../../../errors/app-error'
import { MostrarEntregaService } from '../services/MostrarEntregaService' // Corrigido para Mostrar
import { Request, Response } from 'express'

export class MostrarEntregaController {
  constructor(private mostrarEntregaService: MostrarEntregaService) {}

  async handle(req: Request, res: Response) {
    const { codigo_operacao } = req.params

    if (!codigo_operacao) {
      throw new AppError('Código da operação é obrigatório', 400)
    }

    const entrega = await this.mostrarEntregaService.execute({
      codigo_operacao: Number(codigo_operacao),
    })

    if (!entrega) {
      throw new AppError('Entrega não encontrada', 404)
    }

    return res.json(entrega)
  }
}
