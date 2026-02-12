import { DataSource } from 'typeorm'
import { Ocorrencias } from '../entities/Ocorrencias'
import {
  Entregas,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'

export const runSeed = async (dataSource: DataSource) => {
  const entregaRepo = dataSource.getRepository(Entregas)
  const itemRepo = dataSource.getRepository(ItensPedido)
  const ocorrenciaRepo = dataSource.getRepository(Ocorrencias)
  const ocorrenciaEntregaRepo = dataSource.getRepository(OcorrenciasEntrega)

  // Limpeza correta respeitando ordem das FK
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0')
  await ocorrenciaEntregaRepo.clear()
  await itemRepo.clear()
  await entregaRepo.clear()
  await ocorrenciaRepo.clear()
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1')

  // ============================
  // 1️⃣ OCORRENCIAS (5)
  // ============================
  const ocorrencias = await ocorrenciaRepo.save([
    { descricao_ocorrencia: 'Cliente Ausente' },
    { descricao_ocorrencia: 'Endereço não localizado' },
    { descricao_ocorrencia: 'Veículo Quebrado' },
    { descricao_ocorrencia: 'Mercadoria Avariada' },
    { descricao_ocorrencia: 'Recusa de Recebimento' },
  ])

  // ============================
  // 2️⃣ ENTREGAS (5)
  // ============================
  const entregas: Entregas[] = []

  for (let i = 1; i <= 5; i++) {
    const entrega = await entregaRepo.save({
      sequencia_entrega: i,
      codigo_cliente: 2000 + i,
      nome_cliente: `Cliente ${i}`,
      endereco: `Rua Principal, ${i * 50}`,
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: `09000-00${i}`,
      Observacao: `Observação entrega ${i}`,
      status_entrega: StatusEntregaEnum.INICIADO,
      status_resultado: StatusResultadoEnum.NAO_ENTREGUE,
    })

    entregas.push(entrega)
  }

  // ============================
  // 3️⃣ ITENSPEDIDO (5)
  // ============================
  for (let i = 0; i < 5; i++) {
    await itemRepo.save({
      codigo_entrega: entregas[i].codigo_operacao,
      descricao_produto: `Produto ${i + 1}`,
      embalagem: 'CX',
      quantidade: (i + 1) * 10,
    })
  }

  // ============================
  // 4️⃣ OCORRENCIASENTREGA (5)
  // ============================
  for (let i = 0; i < 5; i++) {
    await ocorrenciaEntregaRepo.save({
      entrega: entregas[i],
      ocorrencia: ocorrencias[i],
    })
  }

  console.log('✅ Seed executado com sucesso!')
  console.log('- 5 Ocorrencias')
  console.log('- 5 Entregas')
  console.log('- 5 ItensPedido')
  console.log('- 5 OcorrenciasEntrega')
}
