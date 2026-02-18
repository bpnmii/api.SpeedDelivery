import { EntityManager, Repository } from 'typeorm'
import { Entregadores } from '../entities/Entregadores'

export class EntregadoresRepositories extends Repository<Entregadores> {
  constructor(dataSource: EntityManager) {
    super(Entregadores, dataSource)
  }
}
