import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  descricao_ocorrencia: string
}

export class CriarOcorrenciaService {
  constructor(private OcorrenciaRepository: OcorrenciasRepositories) {}

  async execute(data: IRequest) {
    const ocorrencia = this.OcorrenciaRepository.create(data)

    const ocorrenciaExiste = await this.OcorrenciaRepository.findOneBy({
      descricao_ocorrencia: data.descricao_ocorrencia,
    })

    if (ocorrenciaExiste) {
      throw new AppError('Ocorrência já existe!', 400)
    }

    await this.OcorrenciaRepository.save(ocorrencia)

    return ocorrencia
  }
}
