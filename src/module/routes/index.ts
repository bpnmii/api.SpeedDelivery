import { Router } from 'express'
import entregasRoutes from './entregas.routes'
import itensPedidoRoutes from './itensPedido.routes'
import ocorrenciasRoutes from './ocorrencias.routes'

const router = Router()

router.use('/entregas', entregasRoutes)
router.use('/itensPedido', itensPedidoRoutes)
router.use('/ocorrencias', ocorrenciasRoutes)

export default router
