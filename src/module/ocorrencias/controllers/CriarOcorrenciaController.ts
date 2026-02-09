import { Request, Response } from 'express'
import z from 'zod'
import { CriarOcorrenciaService } from '../services/CriarOcorrenciaService'

export class CriarOcorrenciaController {
  constructor(private CriarOcorrenciaService: CriarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo_ocorrencia: z.number(),
      descricao_ocorrencia: z.string(),
    })

    const { codigo_ocorrencia, descricao_ocorrencia } = bodySchema.parse(
      req.body,
    )

    const entrega = await this.CriarOcorrenciaService.execute({
      codigo_ocorrencia,
      descricao_ocorrencia,
    })

    return res.status(201).json(entrega)
  }
}
