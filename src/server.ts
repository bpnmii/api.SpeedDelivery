/* eslint-disable no-console */
import ip from 'ip'
import app from './app'

// import './container'

import { AppDataSource } from './database'

AppDataSource.initialize().then(async () => {
  console.log('banco conectado! 🚀')
})

app.listen(3333, () => {
  console.log(`Server is running on port ${ip.address()}:3333 👍`)
})
