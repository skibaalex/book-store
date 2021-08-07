import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '../helpers/tokens';
import authenticate, { PayloadType } from '../helpers/authenticate';
import asyncHandler from '../helpers/asyncHandler';
import User, { UserType } from '../models/User';
import { CustomError } from '../helpers/errorHandle';

const authRouter = Router();

/**
 * Cookie Options
 */

const cookieOptions = {
  httpOnly: false,
  domain: 'localhost',
};

/**
 * Register a new User
 */
authRouter.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { body } = req;
  const user = new User(body);
  user.password = bcrypt.hashSync(user.password, 10);
  await user.save();
  return res.status(200).cookie('refreshToken', createRefreshToken(user), cookieOptions).json({ token: createAccessToken(user), user });
}));

/**
 * Authenticate a user
 */
authRouter.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: UserType = await User.findOne({ email });
  const match: boolean = await bcrypt.compare(password, user.password);
  if (match) {
    return res.status(200).cookie('refreshToken', createRefreshToken(user), cookieOptions).json({ token: createAccessToken(user), user });
  }
  throw new CustomError('Email or Password are incorrect', 403);
}));

/**
 * Get the currently authenticated user
 */
authRouter.get('/', authenticate, (req, res) => {
  res.json(req.user);
});

/**
 * Update a user
 */
authRouter.put('/', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const data = req.body as UserType;
  if (data.password && !data.password.match(/^\$2[ayb]\$.{56}$/)) {
    data.password = bcrypt.hashSync(req.user!.password, 10);
  }
  await User.findByIdAndUpdate(req.user?._id, data, { returnOriginal: false });
  return res.status(201).end();
}));

/**
 * Refresh access token
 */
authRouter.post('/refresh-token', asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new CustomError('Unauthorized Request', 403);
  }
  try {
    const payload = verify(refreshToken, process.env.REFRESH_SECRET!) as PayloadType;
    const user = await User.findById(payload._id);
    if (!user) throw new CustomError('Unauthorized Request', 403);
    return res.status(200).cookie('refreshToken', createRefreshToken(user), cookieOptions).json({ token: createAccessToken(user) });
  } catch (err) {
    throw new CustomError('Refresh token expired', 403);
  }
}));

export default authRouter;
