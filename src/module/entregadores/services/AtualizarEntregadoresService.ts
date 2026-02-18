import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import AppError from '../../../errors/app-error' // Importando seu padrão de erro

interface IRequest {
  codigo_entregador: number
  unidade_negocio?: string
  email?: string
  senha?: string
}

export class AtualizarEntregadorService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}

  async execute(data: IRequest) {
    const { codigo_entregador, ...updateData } = data

    const entregador = await this.EntregadoresRepositories.findOneBy({
      codigo_entregador,
    })

    if (!entregador) {
      throw new AppError('Entregador não encontrado!', 404)
    }

    await this.EntregadoresRepositories.update(
      { codigo_entregador },
      updateData,
    )

    return { ...entregador, ...updateData }
  }
}
