import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo: number
  codigo_entrega: number
  descricao_produto: string
  embalagem: string
  quantidade: number
}

export class CriarItensPedidoervice {
  constructor(private itensPedidoRepository: ItensPedidoRepositories) {}

  async execute({
    codigo,
    codigo_entrega,
    descricao_produto,
    embalagem,
    quantidade,
  }: IRequest) {
    const usuarioExiste = await this.itensPedidoRepository.findOneBy({
      codigo,
    })

    if (usuarioExiste) {
      throw new AppError('Operação já existe!', 400)
    }

    const itensPedido = this.itensPedidoRepository.create({
      codigo,
      codigo_entrega,
      descricao_produto,
      embalagem,
      quantidade,
    })

    await this.itensPedidoRepository.save(itensPedido)

    return {
      codigo: itensPedido.codigo,
      codigo_entrega: itensPedido.codigo_entrega,
      descricao_produto: itensPedido.descricao_produto,
      embalagem: itensPedido.embalagem,
      quantidade: itensPedido.quantidade,
    }
  }
}
