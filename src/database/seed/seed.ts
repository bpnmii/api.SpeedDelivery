import { DataSource } from 'typeorm'
import { Ocorrencias } from '../entities/Ocorrencias'
import {
  Entregas,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'

export const runSeed = async (dataSource: DataSource) => {
  // 1. Repositórios
  const entregaRepo = dataSource.getRepository(Entregas)
  const itemRepo = dataSource.getRepository(ItensPedido)
  const ocorrenciaRepo = dataSource.getRepository(Ocorrencias)

  // 2. Limpeza (Obrigatório para evitar o erro que você recebeu)
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0')
  await itemRepo.clear() // Limpa itens primeiro
  await entregaRepo.clear()
  await ocorrenciaRepo.clear()
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1')

  // 3. Criar Entregas
  const entrega1 = entregaRepo.create({
    sequencia_entrega: 1,
    codigo_cliente: 501,
    nome_cliente: 'Empresa ABC',
    endereco: 'Rua Exemplo, 100',
    bairro: 'Industrial',
    cidade: 'Santo André',
    estado: 'SP',
    CEP: '09000-000',
    status_entrega: StatusEntregaEnum.NAO_INICIADO,
  })

  // Salva a entrega primeiro para gerar o ID (codigo_operacao)
  const entregaSalva = await entregaRepo.save(entrega1)

  // 4. Criar Itens vinculados à entrega salva
  const item1 = itemRepo.create({
    codigo_entrega: entregaSalva.codigo_operacao, // Agora o ID existe de verdade!
    descricao_produto: 'Cabo HDMI 2.0',
    embalagem: 'UN',
    quantidade: 10,
  })

  await itemRepo.save(item1)

  // Repita o processo para os outros 4 registros...
  console.log('Seed executado com sucesso!')
}
