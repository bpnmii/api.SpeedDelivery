import { DataSource } from 'typeorm'
import { Ocorrencias } from '../entities/Ocorrencias'
import {
  Entregas,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'
import { Entregadores } from '../entities/Entregadores'

export const runSeed = async (dataSource: DataSource) => {
  const entregadorRepo = dataSource.getRepository(Entregadores)
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
  await entregadorRepo.clear()
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1')

  // ============================
  // 1️⃣ ENTREGADORES (5)
  // ============================
  const entregadores = await entregadorRepo.save([
    {
      unidade_negocio: 'Santo André',
      email: 'carlos.silva@speeddelivery.com',
      senha: 'senha123',
    },
    {
      unidade_negocio: 'Santo André',
      email: 'ana.souza@speeddelivery.com',
      senha: 'senha123',
    },
    {
      unidade_negocio: 'São Bernardo',
      email: 'marcos.lima@speeddelivery.com',
      senha: 'senha123',
    },
    {
      unidade_negocio: 'São Caetano',
      email: 'julia.mendes@speeddelivery.com',
      senha: 'senha123',
    },
    {
      unidade_negocio: 'Diadema',
      email: 'roberto.costa@speeddelivery.com',
      senha: 'senha123',
    },
  ])

  // ============================
  // 2️⃣ OCORRENCIAS (5)
  // ============================
  const ocorrencias = await ocorrenciaRepo.save([
    { descricao_ocorrencia: 'Iniciado' },
    { descricao_ocorrencia: 'Pausado' },
    { descricao_ocorrencia: 'Concluido' },
    { descricao_ocorrencia: 'Cliente Ausente' },
    { descricao_ocorrencia: 'Endereço não localizado' },
    { descricao_ocorrencia: 'Veículo Quebrado' },
    { descricao_ocorrencia: 'Mercadoria Avariada' },
    { descricao_ocorrencia: 'Recusa de Recebimento' },
  ])

  // ============================
  // 3️⃣ ENTREGAS (5) — endereços reais do ABC Paulista
  // ============================
  const dadosEntregas = [
    {
      sequencia_entrega: 1,
      codigo_cliente: 2001,
      nome_cliente: 'João Almeida',
      endereco: 'Av. Industrial, 600',
      bairro: 'Campestre',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09080-500',
      observacao: 'Entregar na portaria',
    },
    {
      sequencia_entrega: 2,
      codigo_cliente: 2002,
      nome_cliente: 'Mariana Souza',
      endereco: 'Rua Senador Flaquer, 70',
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09020-020',
      observacao: 'Ligar antes de entregar',
    },
    {
      sequencia_entrega: 3,
      codigo_cliente: 2003,
      nome_cliente: 'Carlos Henrique Lima',
      endereco: 'Av. Kennedy, 700',
      bairro: 'Vila Assunção',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09090-000',
      observacao: 'Entregar das 9h às 18h',
    },
    {
      sequencia_entrega: 4,
      codigo_cliente: 2004,
      nome_cliente: 'Fernanda Oliveira',
      endereco: 'Rua Marechal Deodoro, 234',
      bairro: 'Centro',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09710-110',
      observacao: 'Solicitar assinatura',
    },
    {
      sequencia_entrega: 5,
      codigo_cliente: 2005,
      nome_cliente: 'Rafael Martins',
      endereco: 'Av. Goiás, 820',
      bairro: 'Centro',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09521-001',
      observacao: 'Fragil, manusear com cuidado',
    },
  ]

  const entregas: Entregas[] = []

  for (let i = 0; i < dadosEntregas.length; i++) {
    const entrega = await entregaRepo.save({
      ...dadosEntregas[i],
      entregador: entregadores[i],
      status_entrega: StatusEntregaEnum.INICIADO,
      status_resultado: StatusResultadoEnum.NAO_ENTREGUE,
    })
    entregas.push(entrega)
  }

  // ============================
  // 4️⃣ ITENSPEDIDO (5)
  // ============================
  const produtos = [
    { descricao: 'Notebook Dell Inspiron', embalagem: 'CX', quantidade: 10 },
    { descricao: 'Monitor LG 24"', embalagem: 'CX', quantidade: 20 },
    { descricao: 'Teclado Mecânico', embalagem: 'CX', quantidade: 30 },
    { descricao: 'Mouse Gamer', embalagem: 'SC', quantidade: 40 },
    { descricao: 'Headset USB', embalagem: 'SC', quantidade: 50 },
  ]

  for (let i = 0; i < 5; i++) {
    await itemRepo.save({
      codigo_entrega: entregas[i].codigo_operacao,
      descricao_produto: produtos[i].descricao,
      embalagem: produtos[i].embalagem,
      quantidade: produtos[i].quantidade,
    })
  }

  // ============================
  // 5️⃣ OCORRENCIASENTREGA (5)
  // ============================
  for (let i = 0; i < 5; i++) {
    await ocorrenciaEntregaRepo.save({
      entrega: entregas[i],
      ocorrencia: ocorrencias[i],
    })
  }

  console.log('✅ Seed executado com sucesso!')
  console.log('- 5 Entregadores')
  console.log('- 5 Ocorrencias')
  console.log('- 5 Entregas')
  console.log('- 5 ItensPedido')
  console.log('- 5 OcorrenciasEntrega')
}
