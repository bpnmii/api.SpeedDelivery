import { EntregadoresRepositories } from '@/database/repositories/EntregadoresRepositories'
import AppError from '../../../errors/app-error'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface IRequest {
  email: string
  senha: string
}

export class LoginService {
  constructor(private entregadoresRepository: EntregadoresRepositories) {}

  async execute({ email, senha }: IRequest) {
    const entregador = await this.entregadoresRepository.findOneBy({ email })

    if (!entregador) {
      throw new AppError('Entregador não encontrado', 401)
    }

    const senhaCorreta = await bcrypt.compare(senha, entregador.senha)
    if (!senhaCorreta) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const secret = process.env.JWT_SECRET || 'default_secret'
    const expiresIn = (process.env.JWT_EXPIRES_IN ||
      '1d') as jwt.SignOptions['expiresIn']

    const token = jwt.sign(
      { id: entregador.codigo_entregador, email: entregador.email },
      secret,
      {
        expiresIn,
      },
    )

    return {
      entregador: {
        codigo_entregador: entregador.codigo_entregador,
        nome: entregador.unidade_negocio,
        email: entregador.email,
      },
      token,
    }
  }
}
