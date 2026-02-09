import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'

export class ListarOcorrenciasEntregaService {
  constructor(
    private ocorrenciasEntregaRepositories: OcorrenciasEntregaRepositories,
  ) {}
  async execute() {
    return this.ocorrenciasEntregaRepositories.find()
  }
}
