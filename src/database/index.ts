import 'reflect-metadata'
import path from 'path'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const entities = path.join(__dirname, '/entities/*{.js,.ts}')
const migrations = path.join(__dirname, '/migrations/*{.js,.ts}')

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', // Deixe vazio conforme configurado no Docker
  database: 'SpeedDelivery', // Nome novo
  synchronize: true,
  logging: false,
  entities: [entities],
  migrations: [migrations],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
})
