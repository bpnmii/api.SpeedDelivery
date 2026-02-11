import { Router } from 'express'
import { CriarOcorrenciasEntregaFactory } from '../ocorrenciasEntrega/factories/CriarOcorrenciasEntregaFactory'
import { ListarOcorrenciasEntregaFactory } from '../ocorrenciasEntrega/factories/ListarOcorrenciasEntregaFactory'
import { MostrarOcorrenciasEntregaFactory } from '../ocorrenciasEntrega/factories/MostrarOcorrenciasEntregaFactory'

const router = Router()

router.post('/', CriarOcorrenciasEntregaFactory)
router.get('/', ListarOcorrenciasEntregaFactory)
router.get('/:codigo_entrega', MostrarOcorrenciasEntregaFactory)

export default router
