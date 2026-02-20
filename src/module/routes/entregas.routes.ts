import { Router } from 'express'
import { AtualizarEntregaFactory } from '../entregas/factories/AtualizarEntregaFactory'
import { CriarEntregaFactory } from '../entregas/factories/CriarEntregaFactory'
import { DeletarEntregaFactory } from '../entregas/factories/DeletarEntregaFactory'
import { ListarEntregaFactory } from '../entregas/factories/ListarEntregaFactory'
import { MostrarEntregaFactory } from '../entregas/factories/MostrarEntregaFactory'
import { MostrarEntregaEntregadorFactory } from '../entregas/factories/MostrarEntregaEntregadorFactory'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })
const router = Router()

router.post('/', CriarEntregaFactory)
router.get('/', ListarEntregaFactory)
router.get('/:codigo_operacao', MostrarEntregaFactory)
router.get('/entregador/:codigo_entregador', MostrarEntregaEntregadorFactory)
router.delete('/:codigo_operacao', DeletarEntregaFactory)
router.patch(
  '/:codigo_operacao',
  upload.array('imagem'), // ← mesmo nome do FormData
  AtualizarEntregaFactory,
)

export default router
