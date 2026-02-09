import { Router } from 'express'
import entregasRoutes from './entregas.routes'
import itensPedidoRoutes from './itensPedido.routes'

const router = Router()

router.use('/entregas', entregasRoutes)
router.use('/itensPedido', itensPedidoRoutes)

export default router
