/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const errorHandle = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === 'ValidationError' || err.name === 'MongoError') err.status = 400;
  if (err.code === 11000) {
    err.message = 'Document already exists';
  }
  return res.status(err.status || 500).json(err);
};

export default errorHandle;

export class CustomError extends Error {
    status: number

    errorMessage: string

    constructor(message: string, status:number) {
      super(message);
      this.status = status;
      this.errorMessage = message;
    }
}
