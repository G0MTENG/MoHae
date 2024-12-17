import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:5173', // 리액트 dev
  ],
  credentials: true,
  optionsSuccessStatus: 204,
}
