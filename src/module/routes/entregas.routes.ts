import { Router } from 'express'
import { AtualizarEntregaFactory } from '../entregas/factories/AtualizarEntregaFactory'
import { CriarEntregaFactory } from '../entregas/factories/CriarEntregaFactory'
import { DeletarEntregaFactory } from '../entregas/factories/DeletarEntregaFactory'
import { ListarEntregaFactory } from '../entregas/factories/ListarEntregaFactory'

const router = Router()

router.post('/', CriarEntregaFactory)
router.get('/', ListarEntregaFactory)
router.delete('/:id', DeletarEntregaFactory)
router.put('/:id', AtualizarEntregaFactory)

export default router
