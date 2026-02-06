import { EntityManager, Repository } from 'typeorm'
import { ItensPedido } from '../entities/ItensPedido'

export class ItensPedidoRepositories extends Repository<ItensPedido> {
  constructor(dataSource: EntityManager) {
    super(ItensPedido, dataSource)
  }
}
