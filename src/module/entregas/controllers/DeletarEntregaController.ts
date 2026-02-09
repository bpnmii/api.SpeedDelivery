import z from 'zod'
import { DeletarEntregaService } from '../services/DeletarEntregaService'
import { Response, Request } from 'express'

export class DeletarEntregaController {
  constructor(private deletarEntregaService: DeletarEntregaService) {}

  async handle(req: Request, res: Response) {
    const SchemaParams = z.object({
      codigo_operacao: z.coerce.number(),
    })

    const { codigo_operacao } = SchemaParams.parse(req.params)

    const resultado = await this.deletarEntregaService.execute(codigo_operacao)

    return res.json(resultado)
  }
}
