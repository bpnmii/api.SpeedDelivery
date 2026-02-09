import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo_ocorrencia: number
  descricao_ocorrencia: string
}

export class CriarOcorrenciaService {
  constructor(private OcorrenciaRepository: OcorrenciasRepositories) {}

  async execute(data: IRequest) {
    const ocorrenciaExiste = await this.OcorrenciaRepository.findOneBy({
      codigo_ocorrencia: data.codigo_ocorrencia,
    })

    if (ocorrenciaExiste) {
      throw new AppError('Ocorrência já existe!', 400)
    }

    const ocorrencia = this.OcorrenciaRepository.create(data)

    await this.OcorrenciaRepository.save(ocorrencia)

    return ocorrencia
  }
}
