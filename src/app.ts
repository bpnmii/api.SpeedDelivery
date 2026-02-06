/* eslint-disable no-console */
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import catchAppError from './middlewares/catch-app-error'
import routes from './module/routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(catchAppError)

export default app
