import multer from 'multer'
import path from 'path'
import { randomUUID } from 'crypto'

export const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const fileName = `${randomUUID()}-${file.originalname}`
      callback(null, fileName)
    },
  }),
})
