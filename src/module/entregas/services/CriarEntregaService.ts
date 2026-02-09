import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  sequencia_entrega: number
  codigo_operacao?: number
  codigo_cliente: number
  nome_cliente: string
  CEP: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  status_entrega?: StatusEntregaEnum
  status_resultado?: StatusResultadoEnum
}

export class CriarEntregaService {
  constructor(private entregasRepository: EntregasRepositories) {}

  async execute(data: IRequest) {
    if (data.codigo_operacao) {
      const entregaExiste = await this.entregasRepository.findOneBy({
        codigo_operacao: data.codigo_operacao,
      })

      if (entregaExiste) {
        throw new AppError('Operação já existe!', 400)
      }
    }

    const entrega = this.entregasRepository.create(data)

    await this.entregasRepository.save(entrega)

    return entrega
  }
}
