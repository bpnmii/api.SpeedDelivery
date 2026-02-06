import { ItensPedidoRepositories } from '../../../database/repositories/ItensPedidoRepositories'

export class ListarItensPedidoService {
  constructor(private ItensPedidoRepositories: ItensPedidoRepositories) {}
  async execute() {
    return this.ItensPedidoRepositories.find()
  }
}
