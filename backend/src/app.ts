import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/user.routes'
import bugRoutes from './routes/bug.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Fix Bugs funcionando! 🐞')
})

app.use('/', userRoutes)
app.use('/', bugRoutes)

console.log('🔍 URI Mongo:', process.env.MONGO_URI)

mongoose
  .connect(process.env.MONGO_URI || '', {
    dbName: 'fixbugs',
  })
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro MongoDB:', err))

export default app
