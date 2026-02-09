import { Request, Response } from 'express'
import z from 'zod'
import { CriarOcorrenciasEntregaService } from '../services/CriarOcorrenciasEntregaService'

export class CriarOcorrenciasEntregaController {
  constructor(
    private CriarOcorrenciasEntregaService: CriarOcorrenciasEntregaService,
  ) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo_ocorrencia: z.number(),
      codigo_entrega: z.number(),
    })

    const { codigo_ocorrencia, codigo_entrega } = bodySchema.parse(req.body)

    const entrega = await this.CriarOcorrenciasEntregaService.execute({
      codigo_ocorrencia,
      codigo_entrega,
    })

    return res.status(201).json(entrega)
  }
}
