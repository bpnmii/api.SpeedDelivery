import z from 'zod'
import { DeletarEntregadorService } from '../services/DeletarEntregadoresService'
import { Response, Request } from 'express'

export class DeletarEntregadorController {
  constructor(private DeletarEntregadorService: DeletarEntregadorService) {}

  async handle(req: Request, res: Response) {
    const SchemaParams = z.object({
      codigo: z.coerce.number(),
    })

    const { codigo } = SchemaParams.parse(req.params)

    const resultado = await this.DeletarEntregadorService.execute(codigo)

    return res.json(resultado)
  }
}
