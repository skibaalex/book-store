import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../models/User';
import asyncHandler from './asyncHandler';
import { CustomError } from './errorHandle';

export interface PayloadType {
  _id: string,
  iat: number,
  exp: number
}

const authenticate = asyncHandler(async (req:Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]!;
  if (!token) throw new CustomError('Unauthorized Request', 403);
  try {
    const payload = verify(token, process.env.SECRET!) as PayloadType;
    req.user = await User.findById(payload._id).populate('books');
    if (req.user) {
      return next();
    }
    throw new CustomError('Unauthorized Request', 403);
  } catch {
    throw new CustomError('Access token is expired', 403);
  }
});

export const isAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user!.isAdmin) { return next(); }
  const error = {
    status: 403,
    message: 'Unauthorized Request',
  };
  return next(error);
};

export default authenticate;
