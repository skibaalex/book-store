import { Router } from 'express';
import authRouter from './auth';

const api = Router();

/**
 * @swagger
 * /auth:
 *  tags:
 *    - auth
 *  get:
 *    responses:
 *      200:
 *        description: Returns what ever
 */
api.use('/auth', authRouter);
