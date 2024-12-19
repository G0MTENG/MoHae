import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: [
    'https://mohae.ap-northeast-2.elasticbeanstalk.com',
    'http://mohae.ap-northeast-2.elasticbeanstalk.com'
  ],
  credentials: true,
  optionsSuccessStatus: 204,
}
