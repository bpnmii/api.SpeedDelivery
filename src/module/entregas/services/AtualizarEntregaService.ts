import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'

interface IRequest {
  sequencia_entrega: number
  codigo_operacao: string
  codigo_cliente: string
  nome_cliente: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
}

export class AtualizarEntregaService {
  constructor(private EntregassRepositories: EntregasRepositories) {}

  async execute(data: IRequest) {
    const { id, ...updateData } = data

    const EntregasExists = await this.EntregassRepositories.findOneBy({ id })
    if (!EntregasExists) throw new Error('Entregas not found!')

    await this.EntregassRepositories.update(id, updateData)

    return { ...EntregasExists, ...updateData }
  }
}
