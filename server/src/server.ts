import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import './database';
import './container';

import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err.message);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
