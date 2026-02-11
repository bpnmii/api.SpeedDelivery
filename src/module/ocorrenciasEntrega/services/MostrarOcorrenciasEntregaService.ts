import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'

interface IRequest {
  codigo_entrega: number
  codigo_ocorrencia: number
  created_At: Date
}

export class MostrarOcorrenciasEntregaService {
  constructor(
    private ocorrenciasEntregaRepository: OcorrenciasEntregaRepositories,
  ) {}

  async execute(codigo_entrega: number) {
    const itens = await this.ocorrenciasEntregaRepository.find({
      where: {
        entrega: { codigo_operacao: codigo_entrega },
      },
      relations: ['entrega', 'ocorrencia'],
    })

    if (itens.length === 0) {
      throw new Error('Nenhuma ocorrência encontrada para esta entrega!')
    }

    return itens
  }
}
