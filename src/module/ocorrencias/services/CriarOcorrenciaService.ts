import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo_ocorrencia: number
  descricao_ocorrencia: string
}

export class CriarOcorrenciaService {
  constructor(private OcorrenciaRepository: OcorrenciasRepositories) {}

  async execute({ codigo_ocorrencia, descricao_ocorrencia }: IRequest) {
    const usuarioExiste = await this.OcorrenciaRepository.findOneBy({
      codigo_ocorrencia,
    })

    if (usuarioExiste) {
      throw new AppError('Operação já existe!', 400)
    }

    const ocorrencia = this.OcorrenciaRepository.create({
      codigo_ocorrencia,
      descricao_ocorrencia,
    })

    await this.OcorrenciaRepository.save(ocorrencia)

    return {
      codigo_ocorrencia: ocorrencia.codigo_ocorrencia,
      descricao_ocorrencia: ocorrencia.descricao_ocorrencia,
    }
  }
}
