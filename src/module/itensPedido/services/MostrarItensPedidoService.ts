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

  async execute(codigo_entrega: number) {
    const itens = await this.ItensPedidoRepositories.find({
      where: { codigo_entrega },
    })

    if (!itens || itens.length === 0) {
      throw new Error('Nenhum item encontrado para esta entrega!')
    }

    return itens
  }
}
