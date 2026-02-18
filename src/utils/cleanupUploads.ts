import fs from 'fs'
import path from 'path'
import cron from 'node-cron'

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads')

// Executa 1x por mês (dia 1 às 00:00)
cron.schedule('0 0 1 * *', async () => {
  try {
    const files = await fs.promises.readdir(uploadsPath)

    const agora = Date.now()
    const umMesEmMs = 30 * 24 * 60 * 60 * 1000

    for (const file of files) {
      const filePath = path.join(uploadsPath, file)
      const stats = await fs.promises.stat(filePath)

      const tempoArquivo = agora - stats.mtime.getTime()

      if (tempoArquivo > umMesEmMs) {
        await fs.promises.unlink(filePath)
        console.log(`Arquivo removido: ${file}`)
      }
    }
  } catch (error) {
    console.error('Erro ao limpar uploads:', error)
  }
})
