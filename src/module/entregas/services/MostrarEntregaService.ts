import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

interface IRequest {
  sequencia_entrega?: number
  codigo_operacao: number
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

export class MostrarEntregaService {
  constructor(private EntregasRepositories: EntregasRepositories) {}

  async execute(data: IRequest) {
    const { codigo_operacao, ...updateData } = data

    const EntregasExists = await this.EntregasRepositories.findOneBy({
      codigo_operacao,
    })
    if (!EntregasExists) throw new Error('Entrega não encontrada!')

    return { ...EntregasExists, ...updateData }
  }
}
