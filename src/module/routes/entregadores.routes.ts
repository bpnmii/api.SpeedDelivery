import { Router } from 'express'
import { CriarEntregadoresFactory } from '../entregadores/factories/CriarEntregadoresFactory'
import { ListarEntregadoresFactory } from '../entregadores/factories/ListarEntregadoresFactory'
import { DeletarEntregadoresFactory } from '../entregadores/factories/DeletarEntregadoresFactory'
import { AtualizarEntregadoresFactory } from '../entregadores/factories/AtualizarEntregadoresFactory'

const router = Router()

router.post('/', CriarEntregadoresFactory)
router.get('/', ListarEntregadoresFactory)
router.delete('/:codigo_entregador', DeletarEntregadoresFactory)
router.patch('/:codigo_entregador', AtualizarEntregadoresFactory)

export default router
