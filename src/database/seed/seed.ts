import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { runSeed } from './run-seed'

import { Entregas } from '../entities/Entregas'
import { ItensPedido } from '../entities/ItensPedido'
import { Ocorrencias } from '../entities/Ocorrencias'
import { OcorrenciasEntrega } from '../entities/OcorrenciasEntrega'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'SpeedDelivery',
  entities: [Entregas, ItensPedido, Ocorrencias, OcorrenciasEntrega],
  synchronize: true,
})

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('🚀 Conectado ao banco')

    await runSeed(AppDataSource)

    await AppDataSource.destroy()
    console.log('Banco atual:')
    const result = await AppDataSource.query('SELECT DATABASE()')
    console.log(result)
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    process.exit(1)
  }
}

main()
