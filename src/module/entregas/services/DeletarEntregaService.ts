import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import AppError from '../../../errors/app-error'

export class DeletarEntregaService {
  constructor(private entregasRepositories: EntregasRepositories) {}

  async execute(codigo_operacao: number) {
    const entrega = await this.entregasRepositories.findOneBy({
      codigo_operacao,
    })

    if (!entrega) {
      throw new AppError('Entrega não encontrada!', 404)
    }

    await this.entregasRepositories.delete(codigo_operacao)

    return { message: 'Entrega removida com sucesso!' }
  }
}
