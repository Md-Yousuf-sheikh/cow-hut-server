import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// using cors
app.use(cors())

// parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Any) => {
  res.send('Hello World!')
})


export default app
