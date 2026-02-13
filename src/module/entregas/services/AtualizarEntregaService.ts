import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'
import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

interface IRequest {
  codigo_operacao: number
  codigo_cliente?: number
  codigo_entregador?: number
  nome_cliente?: string
  CEP?: string
  endereco?: string
  bairro?: string
  cidade?: string
  estado?: string
  observacao?: string
  imagem?: string[]
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
