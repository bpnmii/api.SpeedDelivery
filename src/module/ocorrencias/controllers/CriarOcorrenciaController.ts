import { Request, Response } from 'express'
import z from 'zod'
import { CriarOcorrenciaService } from '../services/CriarOcorrenciaService'

export class CriarOcorrenciaController {
  constructor(private criarOcorrenciaService: CriarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      descricao_ocorrencia: z.string(),
    })

    const data = bodySchema.parse(req.body)

    const ocorrencia = await this.criarOcorrenciaService.execute(data)

    return res.status(201).json(ocorrencia)
  }
}
