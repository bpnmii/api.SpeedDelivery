import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'

export class ListarEntregadoresService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}
  async execute() {
    return this.EntregadoresRepositories.find()
  }
}
