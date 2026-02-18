import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import AppError from '../../../errors/app-error'

export class DeletarEntregadorService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}

  async execute(codigo_entregador: number) {
    const entregador = await this.EntregadoresRepositories.findOneBy({
      codigo_entregador,
    })

    if (!entregador) {
      throw new AppError('Entregador não encontrado!', 404)
    }

    await this.EntregadoresRepositories.delete(codigo_entregador)

    return { message: 'Entregador removido com sucesso!' }
  }
}
