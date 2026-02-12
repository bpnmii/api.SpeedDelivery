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
  observacao?: string
  status_entrega?: StatusEntregaEnum
  status_resultado?: StatusResultadoEnum
}

export class AtualizarEntregaService {
  constructor(private EntregassRepositories: EntregasRepositories) {}

  async execute(data: IRequest) {
    const { codigo_operacao, ...updateData } = data

    const EntregasExists = await this.EntregassRepositories.findOneBy({
      codigo_operacao,
    })
    if (!EntregasExists) throw new Error('Entrega não encontrada!')

    await this.EntregassRepositories.update(codigo_operacao, updateData)

    return { ...EntregasExists, ...updateData }
  }
}
