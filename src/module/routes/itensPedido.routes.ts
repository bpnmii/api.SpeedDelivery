import { Router } from 'express'
import { AtualizarItensPedidoFactory } from '../itensPedido/factories/AtualizarItensPedidoFactory'
import { CriarItensPedidoFactory } from '../itensPedido/factories/CriarItensPedidoFactory'
import { DeletarItensPedidoFactory } from '../itensPedido/factories/DeletarItensPedidoFactory'
import { ListarItensPedidoFactory } from '../itensPedido/factories/ListarItensPedidoFactory'
import { MostrarItensPedidoFactory } from '../itensPedido/factories/MostrarItensPedidoFactory'

const router = Router()

router.post('/', CriarItensPedidoFactory)
router.get('/', ListarItensPedidoFactory)
router.get('/:codigo_entrega', MostrarItensPedidoFactory)
router.delete('/:codigo', DeletarItensPedidoFactory)
router.patch('/:codigo', AtualizarItensPedidoFactory)

export default router
