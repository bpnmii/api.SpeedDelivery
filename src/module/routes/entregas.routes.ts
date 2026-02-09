import { Router } from 'express'
import { AtualizarEntregaFactory } from '../entregas/factories/AtualizarEntregaFactory'
import { CriarEntregaFactory } from '../entregas/factories/CriarEntregaFactory'
import { DeletarEntregaFactory } from '../entregas/factories/DeletarEntregaFactory'
import { ListarEntregaFactory } from '../entregas/factories/ListarEntregaFactory'

const router = Router()

router.post('/', CriarEntregaFactory)
router.get('/', ListarEntregaFactory)
router.delete('/:codigo_operacao', DeletarEntregaFactory)
router.put('/:codigo_operacao', AtualizarEntregaFactory)

export default router
