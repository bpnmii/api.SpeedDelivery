import { Router } from 'express'
import { AtualizarEntregaFactory } from '../entregas/factories/AtualizarEntregaFactory'
import { CriarEntregaFactory } from '../entregas/factories/CriarEntregaFactory'
import { DeletarEntregaFactory } from '../entregas/factories/DeletarEntregaFactory'
import { ListarEntregaFactory } from '../entregas/factories/ListarEntregaFactory'
import { MostrarEntregaFactory } from '../entregas/factories/MostrarEntregaFactory'

const router = Router()

router.post('/', CriarEntregaFactory)
router.get('/', ListarEntregaFactory)
router.get('/:codigo_operacao', MostrarEntregaFactory)
router.delete('/:codigo_operacao', DeletarEntregaFactory)
router.patch('/:codigo_operacao', AtualizarEntregaFactory)

export default router
