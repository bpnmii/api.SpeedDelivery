import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'
import AppError from '../../../errors/app-error'

export class DeletarItensPedidoService {
  constructor(private ItensPedidoRepositories: ItensPedidoRepositories) {}

  async execute(codigo: number) {
    const itensPedido = await this.ItensPedidoRepositories.findOneBy({
      codigo,
    })

    if (!itensPedido) {
      throw new AppError('Item não encontrada!', 404)
    }

    await this.ItensPedidoRepositories.delete(codigo)

    return { message: 'Item removida com sucesso!' }
  }
}
