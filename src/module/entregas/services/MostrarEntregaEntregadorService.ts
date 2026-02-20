import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

interface IRequest {
  sequencia_entrega?: number
  codigo_entregador: number
  codigo_operacao?: number
  codigo_cliente?: number
  nome_cliente?: string
  CEP?: string
  endereco?: string
  bairro?: string
  cidade?: string
  estado?: string
  status_entrega?: StatusEntregaEnum
  status_resultado?: StatusResultadoEnum
}

export class MostrarEntregaEntregadorService {
  constructor(private EntregasRepositories: EntregasRepositories) {}

  async execute(data: IRequest) {
    const { codigo_entregador } = data

    const entregas = await this.EntregasRepositories.find({
      where: {
        entregador: {
          codigo_entregador,
        },
      },
      relations: ['entregador'],
    })

    if (entregas.length === 0) {
      throw new Error('Entrega não encontrada!')
    }

    return entregas
  }
}
