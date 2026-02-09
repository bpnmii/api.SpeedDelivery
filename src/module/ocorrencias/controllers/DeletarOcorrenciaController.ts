import z from 'zod'
import { DeletarOcorrenciaService } from '../services/DeletarOcorrenciaService'
import { Response, Request } from 'express'

export class DeletarOcorrenciaController {
  constructor(private DeletarOcorrenciaService: DeletarOcorrenciaService) {}

  async handle(req: Request, res: Response) {
    const SchemaParams = z.object({
      codigo: z.coerce.number(),
    })

    const { codigo } = SchemaParams.parse(req.params)

    const resultado = await this.DeletarOcorrenciaService.execute(codigo)

    return res.json(resultado)
  }
}
