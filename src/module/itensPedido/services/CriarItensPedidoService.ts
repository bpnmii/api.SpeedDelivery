import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo?: number
  codigo_entrega: number
  descricao_produto: string
  embalagem: string
  quantidade: number
}

export class CriarItensPedidoService {
  constructor(private itensPedidoRepository: ItensPedidoRepositories) {}

  async execute(data: IRequest) {
    if (data.codigo) {
      const entregaExiste = await this.itensPedidoRepository.findOneBy({
        codigo: data.codigo,
      })

      if (entregaExiste) {
        throw new AppError('Operação já existe!', 400)
      }
    }
    const itensPedido = this.itensPedidoRepository.create(data)

    await this.itensPedidoRepository.save(itensPedido)

    return itensPedido
  }
}
