import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const errorHandle = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-param-reassign
  if (err.name === 'ValidationError') err.status = 400;
  if (err.status) {
    return res.status(err.status).json(err);
  }
  console.log(err);
  return res.status(500).send(err);
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
