import { EntityManager, Repository } from 'typeorm'
import { Ocorrencias } from '../entities/Ocorrencias'

export class OcorrenciasRepositories extends Repository<Ocorrencias> {
  constructor(dataSource: EntityManager) {
    super(Ocorrencias, dataSource)
  }
}
