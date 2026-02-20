import { Router } from 'express'
import { CriarEntregadoresFactory } from '../entregadores/factories/CriarEntregadoresFactory'
import { ListarEntregadoresFactory } from '../entregadores/factories/ListarEntregadoresFactory'
import { DeletarEntregadoresFactory } from '../entregadores/factories/DeletarEntregadoresFactory'
import { AtualizarEntregadoresFactory } from '../entregadores/factories/AtualizarEntregadoresFactory'
import { MostrarEntregadorFactory } from '../entregadores/factories/MostrarEntregadorFactory'
import { loginFactory } from '../entregadores/factories/LoginEntregadoresFactory'

const router = Router()

router.post('/', CriarEntregadoresFactory)
router.get('/', ListarEntregadoresFactory)
router.post('/login', loginFactory)
router.delete('/:codigo_entregador', DeletarEntregadoresFactory)
router.get('/:codigo_entregador', MostrarEntregadorFactory)
router.patch('/:codigo_entregador', AtualizarEntregadoresFactory)

export default router
