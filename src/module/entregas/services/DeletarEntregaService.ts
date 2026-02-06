import { UsersRepositories } from '../../../database/repositories/UsersRepositories'
import AppError from '../../../errors/app-error'

export class DeletarEntregaService {
  constructor(private usersRepositories: UsersRepositories) {}

  async execute(id: number) {
    const user = await this.usersRepositories.findOneBy({ id })
    if (!user) throw new AppError('Client dont found!', 404)
    await this.usersRepositories.delete(id)
    return { message: 'Client removed sucessfully!' }
  }
}
