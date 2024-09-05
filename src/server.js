import express from 'express';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import pino from 'pino-http';
import cors from 'cors';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middlewares/auth.js';
dotenv.config();

const PORT = Number(env('PORT', '8080'));

export async function setupServer() {
  const app = express();
  app.use(cookieParser());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactsRouter);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
