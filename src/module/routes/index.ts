import { Router } from 'express'
import entregasRoutes from './entregas.routes'
import itensPedidoRoutes from './itensPedido.routes'
import ocorrenciasRoutes from './ocorrencias.routes'
import ocorrenciasEntregaRoutes from './ocorrenciasEntrega.routes'

const router = Router()

router.use('/entregas', entregasRoutes)
router.use('/itensPedido', itensPedidoRoutes)
router.use('/ocorrencias', ocorrenciasRoutes)
router.use('/ocorrenciasEntrega', ocorrenciasEntregaRoutes)

export default router
