import { OcorrenciasEntregaRepositories } from '../../../database/repositories/OcorrenciasEntregaRepositories'
import AppError from '../../../errors/app-error'

interface IRequest {
  codigo_ocorrencia: number
  codigo_entrega: number
}

export class CriarOcorrenciasEntregaService {
  constructor(private OcorrenciaRepository: OcorrenciasEntregaRepositories) {}

  async execute({ codigo_ocorrencia, codigo_entrega }: IRequest) {
    const usuarioExiste = await this.OcorrenciaRepository.findOneBy({
      codigo_ocorrencia,
    })

    if (usuarioExiste) {
      throw new AppError('Operação já existe!', 400)
    }

    const ocorrenciaE = this.OcorrenciaRepository.create({
      codigo_ocorrencia,
      codigo_entrega,
    })

    await this.OcorrenciaRepository.save(ocorrenciaE)

    return {
      codigo_ocorrencia: ocorrenciaE.codigo_ocorrencia,
      codigo_entrega: ocorrenciaE.codigo_entrega,
    }
  }
}
