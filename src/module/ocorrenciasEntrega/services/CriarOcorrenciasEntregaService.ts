import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo_ocorrencia: number
  codigo_entrega: number
}

export class CriarOcorrenciasEntregaService {
  constructor(private OcorrenciaRepository: OcorrenciasEntregaRepositories) {}

  async execute({ codigo_ocorrencia, codigo_entrega }: IRequest) {
    const vinculoExiste = await this.OcorrenciaRepository.findOneBy({
      codigo_ocorrencia,
      codigo_entrega,
    })

    if (vinculoExiste) {
      throw new AppError(
        'Esta ocorrência já foi registrada para esta entrega!',
        400,
      )
    }

    const ocorrenciaE = this.OcorrenciaRepository.create({
      codigo_ocorrencia,
      codigo_entrega,
    })

    await this.OcorrenciaRepository.save(ocorrenciaE)

    return ocorrenciaE
  }
}
