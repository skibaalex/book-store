import { Router } from 'express';
import authRouter from './auth';
import booksRouter from './books';

const api = Router();

api.use('/auth', authRouter);
api.use('/books', booksRouter);
export default api;
