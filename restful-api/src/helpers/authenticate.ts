import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import User, { UserType } from '../models/User';
import asyncHandler from './asyncHandler';
import { CustomError } from './errorHandle';

const authenticate = asyncHandler(async (req:Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  if (!token) throw new CustomError('Unauthorized Request', 403);
  const user = decode(token) as UserType;
  // eslint-disable-next-line no-underscore-dangle
  const match = await User.exists({ _id: user._id });
  if (match) {
    req.user = await User.findById(user._id);
    return next();
  }
  throw new CustomError('Unauthorized Request', 403);
});

export default authenticate;
