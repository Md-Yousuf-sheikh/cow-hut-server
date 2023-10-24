import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// using cors
app.use(cors())

// parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.get('/cow', (req: Request, res: Response) => {
  res.send('cow World!')
})

export default app
