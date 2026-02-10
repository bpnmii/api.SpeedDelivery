import { Router } from 'express'
import { AtualizarOcorrenciaFactory } from '../ocorrencias/factories/AtualizarOcorrenciaFactory'
import { CriarOcorrenciaFactory } from '../ocorrencias/factories/CriarOcorrenciaFactory'
import { DeletarOcorrenciaFactory } from '../ocorrencias/factories/DeletarOcorrenciaFactory'
import { ListarOcorrenciaFactory } from '../ocorrencias/factories/ListarOcorrenciaFactory'

const router = Router()

router.post('/', CriarOcorrenciaFactory)
router.get('/', ListarOcorrenciaFactory)
router.delete('/:codigo_ocorrencia', DeletarOcorrenciaFactory)
router.patch('/:codigo_ocorrencia', AtualizarOcorrenciaFactory)

export default router
