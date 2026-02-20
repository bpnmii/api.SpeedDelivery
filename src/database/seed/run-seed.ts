import { DataSource } from 'typeorm'
import { Ocorrencias, TipoOcorrenciaEnum } from '../entities/Ocorrencias'
import {
  Entregas,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'
import { Entregadores } from '../entities/Entregadores'
import bcrypt from 'bcryptjs'

export const runSeed = async (dataSource: DataSource) => {
  const entregadorRepo = dataSource.getRepository(Entregadores)
  const entregaRepo = dataSource.getRepository(Entregas)
  const itemRepo = dataSource.getRepository(ItensPedido)
  const ocorrenciaRepo = dataSource.getRepository(Ocorrencias)
  const ocorrenciaEntregaRepo = dataSource.getRepository(OcorrenciasEntrega)

  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0')
  await ocorrenciaEntregaRepo.clear()
  await itemRepo.clear()
  await entregaRepo.clear()
  await ocorrenciaRepo.clear()
  await entregadorRepo.clear()
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1')

  const hashSenha = await bcrypt.hash('123456', 10)

  // ============================
  // ENTREGADORES
  // ============================
  const [carlos, ana, marcos, julia, roberto] = await entregadorRepo.save([
    {
      unidade_negocio: 'Santo André',
      email: 'carlos.silva@gmail.com',
      senha: hashSenha,
    },
    {
      unidade_negocio: 'Santo André',
      email: 'ana.souza@gmail.com',
      senha: hashSenha,
    },
    {
      unidade_negocio: 'São Bernardo do Campo',
      email: 'marcos.lima@gmail.com',
      senha: hashSenha,
    },
    {
      unidade_negocio: 'São Caetano do Sul',
      email: 'julia.mendes@gmail.com',
      senha: hashSenha,
    },
    {
      unidade_negocio: 'Diadema',
      email: 'roberto.costa@gmail.com',
      senha: hashSenha,
    },
  ])

  // ============================
  // OCORRENCIAS (INALTERADAS)
  // ============================
  await ocorrenciaRepo.save([
    {
      nome_ocorrencia: 'Iniciado',
      tipo_ocorrencia: TipoOcorrenciaEnum.STATUS_ENTREGA,
    },
    {
      nome_ocorrencia: 'Pausado',
      tipo_ocorrencia: TipoOcorrenciaEnum.STATUS_ENTREGA,
    },
    {
      nome_ocorrencia: 'Retomado',
      tipo_ocorrencia: TipoOcorrenciaEnum.STATUS_ENTREGA,
    },
    {
      nome_ocorrencia: 'Concluído',
      tipo_ocorrencia: TipoOcorrenciaEnum.STATUS_ENTREGA,
    },
    {
      nome_ocorrencia: 'Cliente Ausente',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_OCORRENCIA,
    },
    {
      nome_ocorrencia: 'Endereço Não Localizado',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_OCORRENCIA,
    },
    {
      nome_ocorrencia: 'Mercadoria Avariada',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_OCORRENCIA,
    },
    {
      nome_ocorrencia: 'Recusa de Recebimento',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_OCORRENCIA,
    },
    {
      nome_ocorrencia: 'Horário de Almoço',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Fiscalização de Trânsito',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Trânsito Intenso',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Problemas Mecânicos',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Obstáculo na Via',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Mal Estar',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
    {
      nome_ocorrencia: 'Nenhuma das opções anteriores',
      tipo_ocorrencia: TipoOcorrenciaEnum.MOTIVO_PAUSA,
    },
  ])

  // ============================
  // ENTREGAS MANUAIS (25)
  // ============================

  const entregas = await entregaRepo.save([
    // ===== CARLOS (Santo André) =====
    {
      codigo_cliente: 1001,
      nome_cliente: 'João Almeida',
      endereco: 'Av. Industrial, 600',
      bairro: 'Campestre',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09080-500',
      entregador: carlos,
    },
    {
      codigo_cliente: 1002,
      nome_cliente: 'Maria Lopes',
      endereco: 'Rua Senador Flaquer, 70',
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09020-020',
      entregador: carlos,
    },
    {
      codigo_cliente: 1003,
      nome_cliente: 'Pedro Martins',
      endereco: 'Av. Portugal, 397',
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09040-010',
      entregador: carlos,
    },
    {
      codigo_cliente: 1004,
      nome_cliente: 'Luciana Souza',
      endereco: 'Rua das Figueiras, 1200',
      bairro: 'Jardim',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09080-300',
      entregador: carlos,
    },
    {
      codigo_cliente: 1005,
      nome_cliente: 'Rafael Lima',
      endereco: 'Av. Dom Pedro II, 1500',
      bairro: 'Campestre',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09080-111',
      entregador: carlos,
    },

    // ===== ANA =====
    {
      codigo_cliente: 1006,
      nome_cliente: 'Camila Rocha',
      endereco: 'Rua Catequese, 255',
      bairro: 'Vila Guiomar',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09090-400',
      entregador: ana,
    },
    {
      codigo_cliente: 1007,
      nome_cliente: 'Bruno Alves',
      endereco: 'Rua Oratório, 3000',
      bairro: 'Parque Oratório',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09260-000',
      entregador: ana,
    },
    {
      codigo_cliente: 1008,
      nome_cliente: 'Daniela Costa',
      endereco: 'Av. Itamarati, 2100',
      bairro: 'Parque Erasmo',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09260-470',
      entregador: ana,
    },
    {
      codigo_cliente: 1009,
      nome_cliente: 'Fernando Dias',
      endereco: 'Rua Carijós, 500',
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09060-001',
      entregador: ana,
    },
    {
      codigo_cliente: 1010,
      nome_cliente: 'Juliana Prado',
      endereco: 'Rua Coronel Oliveira Lima, 400',
      bairro: 'Centro',
      cidade: 'Santo André',
      estado: 'SP',
      CEP: '09010-000',
      entregador: ana,
    },

    // ===== MARCOS =====
    {
      codigo_cliente: 1011,
      nome_cliente: 'Patrícia Gomes',
      endereco: 'Rua Marechal Deodoro, 234',
      bairro: 'Centro',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09710-110',
      entregador: marcos,
    },
    {
      codigo_cliente: 1012,
      nome_cliente: 'Ricardo Melo',
      endereco: 'Av. Kennedy, 1111',
      bairro: 'Anchieta',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09726-253',
      entregador: marcos,
    },
    {
      codigo_cliente: 1013,
      nome_cliente: 'Carla Mendes',
      endereco: 'Av. Faria Lima, 900',
      bairro: 'Centro',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09720-000',
      entregador: marcos,
    },
    {
      codigo_cliente: 1014,
      nome_cliente: 'Thiago Santos',
      endereco: 'Rua Jurubatuba, 1500',
      bairro: 'Centro',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09725-200',
      entregador: marcos,
    },
    {
      codigo_cliente: 1015,
      nome_cliente: 'Amanda Ribeiro',
      endereco: 'Av. Brigadeiro Faria Lima, 500',
      bairro: 'Assunção',
      cidade: 'São Bernardo do Campo',
      estado: 'SP',
      CEP: '09810-000',
      entregador: marcos,
    },

    // ===== JULIA =====
    {
      codigo_cliente: 1016,
      nome_cliente: 'Lucas Andrade',
      endereco: 'Av. Goiás, 820',
      bairro: 'Centro',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09521-001',
      entregador: julia,
    },
    {
      codigo_cliente: 1017,
      nome_cliente: 'Beatriz Lima',
      endereco: 'Rua Santa Catarina, 300',
      bairro: 'Fundação',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09510-120',
      entregador: julia,
    },
    {
      codigo_cliente: 1018,
      nome_cliente: 'Eduardo Nunes',
      endereco: 'Rua Amazonas, 600',
      bairro: 'Centro',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09520-070',
      entregador: julia,
    },
    {
      codigo_cliente: 1019,
      nome_cliente: 'Vanessa Moura',
      endereco: 'Alameda São Caetano, 1500',
      bairro: 'Santa Maria',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09560-500',
      entregador: julia,
    },
    {
      codigo_cliente: 1020,
      nome_cliente: 'Gustavo Rocha',
      endereco: 'Rua Visconde de Inhaúma, 900',
      bairro: 'Oswaldo Cruz',
      cidade: 'São Caetano do Sul',
      estado: 'SP',
      CEP: '09571-380',
      entregador: julia,
    },

    // ===== ROBERTO =====
    {
      codigo_cliente: 1021,
      nome_cliente: 'Sabrina Alves',
      endereco: 'Av. Alda, 300',
      bairro: 'Centro',
      cidade: 'Diadema',
      estado: 'SP',
      CEP: '09910-170',
      entregador: roberto,
    },
    {
      codigo_cliente: 1022,
      nome_cliente: 'Leonardo Costa',
      endereco: 'Rua Manoel da Nóbrega, 450',
      bairro: 'Centro',
      cidade: 'Diadema',
      estado: 'SP',
      CEP: '09910-720',
      entregador: roberto,
    },
    {
      codigo_cliente: 1023,
      nome_cliente: 'Paula Fernandes',
      endereco: 'Av. Fábio Eduardo Ramos Esquivel, 1000',
      bairro: 'Centro',
      cidade: 'Diadema',
      estado: 'SP',
      CEP: '09920-000',
      entregador: roberto,
    },
    {
      codigo_cliente: 1024,
      nome_cliente: 'Marcelo Vieira',
      endereco: 'Rua Serra do Mar, 800',
      bairro: 'Vila Conceição',
      cidade: 'Diadema',
      estado: 'SP',
      CEP: '09981-000',
      entregador: roberto,
    },
    {
      codigo_cliente: 1025,
      nome_cliente: 'Aline Martins',
      endereco: 'Av. Piraporinha, 2000',
      bairro: 'Piraporinha',
      cidade: 'Diadema',
      estado: 'SP',
      CEP: '09950-000',
      entregador: roberto,
    },
  ])

  // ============================
  // 3 ITENS POR ENTREGA
  // ============================
  for (const entrega of entregas) {
    await itemRepo.save([
      {
        codigo_entrega: entrega.codigo_operacao,
        descricao_produto: 'Notebook Dell Inspiron',
        embalagem: 'CX',
        quantidade: 2,
      },
      {
        codigo_entrega: entrega.codigo_operacao,
        descricao_produto: 'Monitor LG 24"',
        embalagem: 'CX',
        quantidade: 3,
      },
      {
        codigo_entrega: entrega.codigo_operacao,
        descricao_produto: 'Mouse Gamer',
        embalagem: 'SC',
        quantidade: 5,
      },
    ])
  }

  console.log('✅ Seed executado com sucesso!')
  console.log('- 5 Entregadores')
  console.log('- 15 Ocorrencias')
  console.log('- 25 Entregas')
  console.log('- 75 ItensPedido')
}
