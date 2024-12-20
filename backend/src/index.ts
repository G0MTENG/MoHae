import helmet from 'helmet'
import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { corsOptions, SocketIO } from '@/configs'
import dotenv from 'dotenv'
import path from 'path'
import {
  authRouter,
  jwtRouter,
  // debugRouter,
  activityRouter,
  userRouter,
  friendRouter,
  chatRouter,
} from '@/routes'
import http from 'http'

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(morgan('dev'))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

// app.use(debugRouter)
app.use(authRouter)
app.use(jwtRouter)
app.use(userRouter)
app.use('/chat', chatRouter)
app.use('/activity', activityRouter)
app.use('/friend', friendRouter)

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

SocketIO.getInstance().init(server)

server.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})
