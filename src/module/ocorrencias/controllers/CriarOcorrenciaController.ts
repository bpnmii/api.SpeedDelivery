import { Request, Response } from 'express'
import z from 'zod'
import { CriarOcorrenciaService } from '../services/CriarOcorrenciaService'
import { TipoOcorrenciaEnum } from '@/database/entities/Ocorrencias'

export class CriarOcorrenciaController {
  constructor(private criarOcorrenciaService: CriarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      nome_ocorrencia: z.string(),
      descricao_ocorrencia: z.string().optional(),
      tipo_ocorrencia: z.nativeEnum(TipoOcorrenciaEnum).optional(),
    })

    const data = bodySchema.parse(req.body)

    const ocorrencia = await this.criarOcorrenciaService.execute(data)

    return res.status(201).json(ocorrencia)
  }
}
