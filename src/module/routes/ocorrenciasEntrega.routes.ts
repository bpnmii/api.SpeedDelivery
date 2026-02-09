import { Router } from 'express'
import { CriarOcorrenciasEntregaFactory } from '../ocorrenciasEntrega/factories/CriarOcorrenciasEntregaFactory'
import { ListarOcorrenciasEntregaFactory } from '../ocorrenciasEntrega/factories/ListarOcorrenciasEntregaFactory'

const router = Router()

router.post('/', CriarOcorrenciasEntregaFactory)
router.get('/', ListarOcorrenciasEntregaFactory)

export default router
