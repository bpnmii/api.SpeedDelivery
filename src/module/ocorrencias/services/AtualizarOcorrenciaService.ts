import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'

interface IRequest {
  codigo_ocorrencia: number
  descricao_ocorrencia?: string
}

export class AtualizarOcorrenciaService {
  constructor(private OcorrenciasRepositories: OcorrenciasRepositories) {}

  async execute(data: IRequest) {
    const { codigo_ocorrencia, ...updateData } = data

    const ItensPedido = await this.OcorrenciasRepositories.findOneBy({
      codigo_ocorrencia,
    })
    if (!ItensPedido) throw new Error('Entregas not found!')

    await this.OcorrenciasRepositories.update(codigo_ocorrencia, updateData)

    return { ...ItensPedido, ...updateData }
  }
}
