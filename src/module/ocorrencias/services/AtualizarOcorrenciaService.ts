import { TipoOcorrenciaEnum } from '@/database/entities/Ocorrencias'
import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import AppError from '../../../errors/app-error' // Importando seu padrão de erro

interface IRequest {
  codigo_ocorrencia: number
  nome_ocorrencia?: string
  tipo_ocorrencia?: TipoOcorrenciaEnum
  descricao_ocorrencia?: string
}

export class AtualizarOcorrenciaService {
  constructor(private OcorrenciasRepositories: OcorrenciasRepositories) {}

  async execute(data: IRequest) {
    const { codigo_ocorrencia, ...updateData } = data

    const ocorrencia = await this.OcorrenciasRepositories.findOneBy({
      codigo_ocorrencia,
    })

    if (!ocorrencia) {
      throw new AppError('Ocorrência não encontrada!', 404)
    }

    await this.OcorrenciasRepositories.update({ codigo_ocorrencia }, updateData)

    return { ...ocorrencia, ...updateData }
  }
}
