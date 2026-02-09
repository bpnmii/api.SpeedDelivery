import { AppDataSource } from '../index' // Ajuste o caminho para o seu DataSource
import { seedDatabase } from './seed' // Ajuste o caminho para onde salvou a seed anterior

async function run() {
  try {
    await AppDataSource.initialize()
    console.log('Banco de dados conectado!')

    await seedDatabase(AppDataSource)

    await AppDataSource.destroy()
    console.log('Conexão encerrada.')
  } catch (error) {
    console.error('Erro ao rodar a seed:', error)
    process.exit(1)
  }
}

run()
