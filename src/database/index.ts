import 'reflect-metadata'
import path from 'path'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const entities = path.join(__dirname, '/entities/*{.js,.ts}')
const migrations = path.join(__dirname, '/migrations/*{.js,.ts}')

export const AppDataSource = new DataSource({
  name: '',
  type: 'mysql',
  host: '',
  port: 0,
  username: '',
  password: '',
  database: '',
  synchronize: true,
  logging: false,
  entities: [entities],
  migrations: [migrations],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
})
