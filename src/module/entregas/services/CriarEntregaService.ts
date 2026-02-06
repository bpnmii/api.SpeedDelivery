import { EntregasRepositories } from '../../../database/repositories/EntregasRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  sequencia_entrega: number
  codigo_operacao: number
  codigo_cliente: number
  nome_cliente: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
}

export class CriarEntregaService {
  constructor(private entregasRepository: EntregasRepositories) {}

  async execute({
    sequencia_entrega,
    codigo_operacao,
    codigo_cliente,
    nome_cliente,
    endereco,
    bairro,
    cidade,
    estado,
  }: IRequest) {
    const usuarioExiste = await this.entregasRepository.findOneBy({
      codigo_operacao,
    })

    if (usuarioExiste) {
      throw new AppError('Operação já existe!', 400)
    }

    const entregas = this.entregasRepository.create({
      sequencia_entrega,
      codigo_operacao,
      codigo_cliente,
      nome_cliente,
      endereco,
      bairro,
      cidade,
      estado,
    })

    await this.entregasRepository.save(entregas)

    return {
      sequencia_entrega: entregas.sequencia_entrega,
      codigo_operacao: entregas.codigo_operacao,
      codigo_cliente: entregas.codigo_cliente,
      nome_cliente: entregas.nome_cliente,
      endereco: entregas.endereco,
      bairro: entregas.bairro,
      cidade: entregas.cidade,
      estado: entregas.estado,
    }
  }
}
