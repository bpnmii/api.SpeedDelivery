import { UsersRepositories } from '../../../database/repositories/UsersRepositories'

export class ListarEntregaService {
  constructor(private usersRepositories: UsersRepositories) {}
  async execute() {
    return this.usersRepositories.find()
  }
}
