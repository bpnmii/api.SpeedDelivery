import { Request, Response } from 'express'
import z from 'zod'
import { AtualizarOcorrenciaService } from '../services/AtualizarOcorrenciaService'

export class AtualizarOcorrenciaController {
  constructor(private atualizarOcorrenciaService: AtualizarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const paramsSchema = z.object({
      codigo_ocorrencia: z.coerce.number(),
    })

    const bodySchema = z.object({
      descricao_ocorrencia: z.string().optional(),
    })

    const { codigo_ocorrencia } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const resultado = await this.atualizarOcorrenciaService.execute({
      codigo_ocorrencia,
      ...data,
    })

    return res.json(resultado)
  }
}
