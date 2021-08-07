import { sign } from 'jsonwebtoken';
import { UserType } from '../models/User';

export const createAccessToken = (user: UserType) => {
  const token = sign({ _id: user._id }, process.env.SECRET!, { expiresIn: '1d' });
  return token;
};

export const createRefreshToken = (user: UserType) => {
  const token = sign({ _id: user._id }, process.env.REFRESH_SECRET!, { expiresIn: '90d' });
  return token;
};
