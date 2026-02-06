import { EntityManager, Repository } from 'typeorm'
import { Entregas } from '../entities/Entregas'

export class EntregasRepositories extends Repository<Entregas> {
  constructor(dataSource: EntityManager) {
    super(Entregas, dataSource)
  }
}
