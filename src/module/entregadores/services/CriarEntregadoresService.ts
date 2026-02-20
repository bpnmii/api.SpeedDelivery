import { EntregadoresRepositories } from '../../../database/repositories/EntregadoresRepositories'
import AppError from '../../../errors/app-error'
import bcrypt from 'bcryptjs'

interface IRequest {
  unidade_negocio: string
  email: string
  senha: string
}

export class CriarEntregadorService {
  constructor(private EntregadoresRepositories: EntregadoresRepositories) {}

  async execute(data: IRequest) {
    const entregadorExiste = await this.EntregadoresRepositories.findOneBy({
      email: data.email,
    })

    if (entregadorExiste) {
      throw new AppError('Email já cadastrado', 400)
    }

    const hashSenha = await bcrypt.hash(data.senha, 10)

    const entregadorSalvo = await this.EntregadoresRepositories.save({
      unidade_negocio: data.unidade_negocio,
      email: data.email,
      senha: hashSenha,
    })

    return entregadorSalvo
  }
}
