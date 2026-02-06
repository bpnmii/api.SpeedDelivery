import { RoleEnum } from '@/database/entities/User'
import { UsersRepositories } from '../../../database/repositories/UsersRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  cpf: string
  address: string
  name: string
  email: string
  tel: string
  role?: RoleEnum
}

export class CriarEntregaService {
  constructor(private usersRepository: UsersRepositories) {}

  async execute({ cpf, address, name, email, tel, role }: IRequest) {
    const usuarioExiste = await this.usersRepository.findOneBy({ email })

    if (usuarioExiste) {
      throw new AppError('E-mail already exists!', 400)
    }

    const users = this.usersRepository.create({
      cpf,
      address,
      name,
      email,
      tel,
      role,
    })

    await this.usersRepository.save(users)

    return {
      id: users.id,
      cpf: users.cpf,
      address: users.address,
      name: users.name,
      email: users.email,
      tel: users.tel,
      role: users.role,
    }
  }
}
