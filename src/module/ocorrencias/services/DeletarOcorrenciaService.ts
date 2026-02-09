import { OcorrenciasRepositories } from '../../../database/repositories/OcorrenciasRepositories'
import AppError from '../../../errors/app-error'

export class DeletarOcorrenciaService {
  constructor(private ocorrenciasRepositories: OcorrenciasRepositories) {}

  async execute(codigo_ocorrencia: number) {
    const itensPedido = await this.ocorrenciasRepositories.findOneBy({
      codigo_ocorrencia,
    })

    if (!itensPedido) {
      throw new AppError('Ocorrencia não encontrada!', 404)
    }

    await this.ocorrenciasRepositories.delete(codigo_ocorrencia)

    return { message: 'Item removida com sucesso!' }
  }
}
