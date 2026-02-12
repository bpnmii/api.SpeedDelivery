import { Request, Response } from 'express'
import z from 'zod'
import { AtualizarEntregaService } from '../services/AtualizarEntregaService'
import {
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '@/database/entities/Entregas'

export class AtualizarEntregaController {
  constructor(private AtualizarEntregaService: AtualizarEntregaService) {}

  async handle(req: Request, res: Response) {
    const paramsSchema = z.object({
      codigo_operacao: z.coerce.number(),
    })

    const arquivos = req.files as Express.Multer.File[]
    const imagens = arquivos?.map((file) => file.filename)

    const bodySchema = z.object({
      sequencia_entrega: z.number().optional(),
      codigo_cliente: z.number().optional(),
      nome_cliente: z.string().optional(),
      CEP: z.string().optional(),
      endereco: z.string().optional(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      observacao: z.string().optional(),
      status_entrega: z.nativeEnum(StatusEntregaEnum),
      status_resultado: z.nativeEnum(StatusResultadoEnum).optional(),
    })

    const { codigo_operacao } = paramsSchema.parse(req.params)
    const data = bodySchema.parse(req.body)

    const payload: any = {
      codigo_operacao,
      ...data,
    }

    if (imagens && imagens.length > 0) {
      payload.imagem = imagens
    }

    const resultado = await this.AtualizarEntregaService.execute(payload)

    return res.json(resultado)
  }
}
