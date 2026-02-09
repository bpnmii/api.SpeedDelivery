import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo: number
  codigo_entrega?: number
  descricao_produto?: string
  embalagem?: string
  quantidade?: number
}

export class AtualizarItensPedidoService {
  constructor(private ItensPedidoRepositories: ItensPedidoRepositories) {}

  async execute(data: IRequest) {
    const { codigo, ...updateData } = data

    const ItensPedido = await this.ItensPedidoRepositories.findOneBy({
      codigo,
    })

    // Ajustado para AppError e mensagem correta
    if (!ItensPedido) {
      throw new AppError('Item do pedido não encontrado!', 404)
    }

    // Usando objeto de critério { codigo } para garantir a atualização correta
    await this.ItensPedidoRepositories.update({ codigo }, updateData)

    return { ...ItensPedido, ...updateData }
  }
}
