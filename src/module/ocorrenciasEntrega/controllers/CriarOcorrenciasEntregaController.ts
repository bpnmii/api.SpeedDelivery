import { Request, Response } from 'express'
import z from 'zod'
import { CriarOcorrenciasEntregaService } from '../services/CriarOcorrenciasEntregaService'

export class CriarOcorrenciasEntregaController {
  constructor(
    private criarOcorrenciasEntregaService: CriarOcorrenciasEntregaService,
  ) {}

  async handle(req: Request, res: Response) {
    const bodySchema = z.object({
      codigo_ocorrencia: z.number(),
      codigo_entrega: z.number(),
    })

    const data = bodySchema.parse(req.body)

    const resultado = await this.criarOcorrenciasEntregaService.execute(data)

    return res.status(201).json(resultado)
  }
}
