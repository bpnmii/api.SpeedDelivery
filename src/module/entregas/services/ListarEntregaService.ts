import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

export class ListarEntregaService {
  constructor(private entregasRepositories: EntregasRepositories) {}
  async execute() {
    return this.entregasRepositories.find()
  }
}
