import express from 'express';
import dotenv from  'dotenv';
import { errorHandler } from './src/middlewares/error-handler-middleware';
import UserRouter from './src/routes/user-route'
dotenv.config();

export const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1',UserRouter);
app.use(errorHandler);
