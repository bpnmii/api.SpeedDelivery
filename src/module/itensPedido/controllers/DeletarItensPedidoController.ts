import z from 'zod'
import { DeletarItensPedidoService } from '../services/DeletarItensPedidoService'
import { Response, Request } from 'express'

export class DeletarItensPedidoController {
  constructor(private deletarItensPedidoService: DeletarItensPedidoService) {}

  async handle(req: Request, res: Response) {
    const SchemaParams = z.object({
      codigo: z.number(),
    })

    const { codigo } = SchemaParams.parse(req.params)

    const resultado = await this.deletarItensPedidoService.execute(codigo)

    return res.json(resultado)
  }
}
