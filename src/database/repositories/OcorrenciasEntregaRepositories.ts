import { EntityManager, Repository } from 'typeorm'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'

export class OcorrenciasEntregaRepositories extends Repository<OcorrenciasEntrega> {
  constructor(dataSource: EntityManager) {
    super(OcorrenciasEntrega, dataSource)
  }
}
