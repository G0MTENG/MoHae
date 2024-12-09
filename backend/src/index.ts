import helmet from 'helmet'
import cors from 'cors'
import express, { Request, response, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions } from '@/configs';
import path from 'path';
import {authRouter} from '@/routes';

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use(authRouter);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});