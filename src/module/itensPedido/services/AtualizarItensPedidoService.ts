import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'

interface IRequest {
  codigo: number
  codigo_entrega: number
  descricao_produto: string
  embalagem: string
  quantidade: number
}

export class AtualizarItensPedidoService {
  constructor(private ItensPedidoRepositories: ItensPedidoRepositories) {}

  async execute(data: IRequest) {
    const { codigo, ...updateData } = data

    const ItensPedido = await this.ItensPedidoRepositories.findOneBy({
      codigo,
    })
    if (!ItensPedido) throw new Error('Entregas not found!')

    await this.ItensPedidoRepositories.update(codigo, updateData)

    return { ...ItensPedido, ...updateData }
  }
}
