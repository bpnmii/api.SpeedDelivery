import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Ocorrencias } from '../entities/Ocorrencias'
import {
  Entregas,
  StatusEntregaEnum,
  StatusResultadoEnum,
} from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', // Certifique-se de que a senha está correta
  database: 'SpeedDelivery',
  entities: [Ocorrencias, Entregas, ItensPedido],
  synchronize: false,
})

async function run() {
  try {
    await AppDataSource.initialize()
    console.log('🚀 Conexão estabelecida para o Seed.')

    const queryRunner = AppDataSource.createQueryRunner()

    console.log('🧹 Limpando dados residuais...')
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0')
    await queryRunner.query('DELETE FROM ItensPedido')
    await queryRunner.query('DELETE FROM Entregas')
    await queryRunner.query('DELETE FROM Ocorrencias')
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1')

    const entregaRepo = AppDataSource.getRepository(Entregas)
    const itemRepo = AppDataSource.getRepository(ItensPedido)
    const ocorrenciaRepo = AppDataSource.getRepository(Ocorrencias)

    // 1. Seed Ocorrências (5 registros)
    console.log('📦 Semeando Ocorrências...')
    await ocorrenciaRepo.save([
      { descricao_ocorrencia: 'Cliente Ausente' },
      { descricao_ocorrencia: 'Endereço não localizado' },
      { descricao_ocorrencia: 'Veículo Quebrado' },
      { descricao_ocorrencia: 'Mercadoria Avariada' },
      { descricao_ocorrencia: 'Recusa de Recebimento' },
    ])

    // 2. Seed Entregas e Itens (5 registros cada)
    console.log('🚚 Semeando Entregas e Itens...')
    for (let i = 1; i <= 5; i++) {
      const entrega = await entregaRepo.save({
        sequencia_entrega: i,
        codigo_cliente: 1000 + i,
        nome_cliente: `Cliente Logística ${i}`,
        endereco: `Avenida das Nações, ${i * 123}`,
        bairro: 'Distrito Industrial',
        cidade: 'Santo André',
        estado: 'SP',
        CEP: `09000-00${i}`,
        status_entrega: StatusEntregaEnum.NAO_INICIADO,
        status_resultado: StatusResultadoEnum.NAO_ENTREGUE,
      })

      // Com a nova estrutura da entidade, passamos o ID diretamente para codigo_entrega
      await itemRepo.save({
        codigo_entrega: entrega.codigo_operacao, // Atribuição direta ao campo numérico
        descricao_produto: `SKU-00${i} - Produto Industrial`,
        embalagem: 'CX',
        quantidade: i * 10,
      })
    }

    console.log('✅ Seed finalizado com sucesso!')
    console.log('- 5 Ocorrências')
    console.log('- 5 Entregas')
    console.log('- 5 Itens de Pedido')

    await AppDataSource.destroy()
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro durante a execução da Seed:', error)
    process.exit(1)
  }
}

run()
