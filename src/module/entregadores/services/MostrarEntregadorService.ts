import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'

interface IRequest {
  codigo_entregador: number
  unidade_negocio?: string
  email?: string
  senha?: string
}

export class MostrarEntregadorService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}

  async execute(data: IRequest) {
    const { codigo_entregador, ...updateData } = data

    const EntregadorExists = await this.EntregadoresRepositories.findOneBy({
      codigo_entregador,
    })
    if (!EntregadorExists) throw new Error('Entregador não encontrado!')

    return { ...EntregadorExists, ...updateData }
  }
}
