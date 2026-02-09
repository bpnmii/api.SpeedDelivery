import { Router } from 'express'
import { AtualizarItensPedidoFactory } from '../itensPedido/factories/AtualizarItensPedidoFactory'
import { CriarItensPedidoFactory } from '../itensPedido/factories/CriarItensPedidoFactory'
import { DeletarItensPedidoFactory } from '../itensPedido/factories/DeletarItensPedidoFactory'
import { ListarItensPedidoFactory } from '../itensPedido/factories/ListarItensPedidoFactory'

const router = Router()

router.post('/', CriarItensPedidoFactory)
router.get('/', ListarItensPedidoFactory)
router.delete('/:codigo', DeletarItensPedidoFactory)
router.put('/:codigo', AtualizarItensPedidoFactory)

export default router
