import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo_entregador?: number
  unidade_negocio: string
  email: string
  senha: string
}

export class CriarEntregadorService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}

  async execute(data: IRequest) {
    const entregador = this.EntregadoresRepositories.create(data)

    const entregadorExiste = await this.EntregadoresRepositories.findOneBy({
      codigo_entregador: data.codigo_entregador,
    })

    if (entregadorExiste) {
      throw new AppError('Entregador já existe!', 400)
    }

    await this.EntregadoresRepositories.save(entregador)

    return entregador
  }
}
