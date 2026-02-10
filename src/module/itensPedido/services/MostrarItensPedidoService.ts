import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'

interface IRequest {
  codigo?: number
  codigo_entrega: number
  descricao_produto?: string
  embalagem?: string
  quantidade?: number
}

export class MostrarItensPedidoService {
  constructor(private ItensPedidoRepositories: ItensPedidoRepositories) {}

  async execute(data: IRequest) {
    const { codigo_entrega, ...updateData } = data

    const ItensPedidoExist = await this.ItensPedidoRepositories.findOneBy({
      codigo_entrega,
    })
    if (!ItensPedidoExist) throw new Error('Entrega não encontrada!')

    return { ...ItensPedidoExist, ...updateData }
  }
}
