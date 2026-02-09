import { DataSource } from 'typeorm'
import { Entregas } from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'
import { Ocorrencias } from '../entities/Ocorrencias'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'

export const seedDatabase = async (dataSource: DataSource) => {
  // Usar queryRunner ou insert evita que o TypeORM tente validar relações complexas
  const entregaRepo = dataSource.getRepository(Entregas)
  const itensRepo = dataSource.getRepository(ItensPedido)
  const ocorrenciaRepo = dataSource.getRepository(Ocorrencias)
  const ocorrenciaEntregaRepo = dataSource.getRepository(OcorrenciasEntrega)

  console.log('Limpando dados antigos...')
  // Limpar as tabelas (na ordem inversa das chaves estrangeiras)
  await ocorrenciaEntregaRepo.delete({})
  await itensRepo.delete({})
  await ocorrenciaRepo.delete({})
  await entregaRepo.delete({})

  console.log('Populando Entregas...')
  await entregaRepo.insert([
    {
      sequencia_entrega: 1,
      codigo_operacao: 1001,
      codigo_cliente: 8,
      nome_cliente: 'Mercado Central',
      CEP: '01001-000',
      endereco: 'Praça da Sé, 10',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    {
      sequencia_entrega: 2,
      codigo_operacao: 1002,
      codigo_cliente: 15,
      nome_cliente: 'Restaurante Sabor Real',
      CEP: '20020-010',
      endereco: 'Rua do Ouvidor, 50',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    {
      sequencia_entrega: 3,
      codigo_operacao: 1003,
      codigo_cliente: 22,
      nome_cliente: 'Padaria Pão Quente',
      CEP: '30140-010',
      endereco: 'Av. Afonso Pena, 1500',
      bairro: 'Funcionários',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
  ])

  console.log('Populando Itens...')
  await itensRepo.insert([
    {
      codigo: 1,
      codigo_entrega: 1001,
      descricao_produto: 'X-Burger Especial',
      embalagem: 'Caixa Kraft',
      quantidade: 2,
    },
    {
      codigo: 2,
      codigo_entrega: 1001,
      descricao_produto: 'Batata Frita G',
      embalagem: 'Saco Papel',
      quantidade: 1,
    },
    {
      codigo: 3,
      codigo_entrega: 1001,
      descricao_produto: 'Combo Família',
      embalagem: 'Caixa Master',
      quantidade: 1,
    },
    {
      codigo: 4,
      codigo_entrega: 1002,
      descricao_produto: 'Hot Dog Completo',
      embalagem: 'Plástico Filme',
      quantidade: 3,
    },
    {
      codigo: 5,
      codigo_entrega: 1003,
      descricao_produto: 'Refrigerante 2L',
      embalagem: 'Garrafa Pet',
      quantidade: 5,
    },
  ])

  console.log('Populando Ocorrências...')
  await ocorrenciaRepo.insert([
    { codigo_ocorrencia: 1, descricao_ocorrencia: 'Endereço não localizado' },
    { codigo_ocorrencia: 2, descricao_ocorrencia: 'Não tinha ninguém em casa' },
    {
      codigo_ocorrencia: 3,
      descricao_ocorrencia: 'Devolução por item avariado',
    },
    { codigo_ocorrencia: 4, descricao_ocorrencia: 'Recusado pelo cliente' },
    {
      codigo_ocorrencia: 5,
      descricao_ocorrencia: 'Entrega realizada com atraso',
    },
  ])

  console.log('Vinculando Ocorrências às Entregas...')
  await ocorrenciaEntregaRepo.insert([
    { codigo_entrega: 1001, codigo_ocorrencia: 1 },
    { codigo_entrega: 1001, codigo_ocorrencia: 2 },
    { codigo_entrega: 1001, codigo_ocorrencia: 3 },
    { codigo_entrega: 1002, codigo_ocorrencia: 4 },
    { codigo_entrega: 1003, codigo_ocorrencia: 5 },
  ])

  console.log('Seed finalizada com sucesso!')
}
