import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: [
    'http://mohae-front-deploy.s3-website.ap-northeast-2.amazonaws.com',
    'http://localhost:5173',
  ],
  credentials: true,
  optionsSuccessStatus: 204,
}
