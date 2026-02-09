import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'

export class ListarOcorrenciaService {
  constructor(private ocorrenciasRepositories: OcorrenciasRepositories) {}
  async execute() {
    return this.ocorrenciasRepositories.find()
  }
}
