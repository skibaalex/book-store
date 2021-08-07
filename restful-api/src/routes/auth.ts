import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authenticate from '../helpers/authenticate';
import asyncHandler from '../helpers/asyncHandler';
import User, { UserType } from '../models/User';
import { CustomError } from '../helpers/errorHandle';

const authRouter = Router();

/**
 * Cookie Options
 */

const cookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 4),
  httpOnly: false,
  domain: 'localhost',
};

/**
 * Create JWT token
 */

const createToken = (str: string): string => sign(str, process.env.SECRET as string);

/**
 * Register a new User
 */
authRouter.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { body } = req;

  const user = new User(body);
  user.password = bcrypt.hashSync(user.password, 10);
  await user.save();
  const token = createToken(JSON.stringify(user));

  res.status(200).cookie('Authorization', token, cookieOptions).json({ token, user });
}));

/**
 * Authenticate a user
 */
authRouter.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = createToken(JSON.stringify(user));
    return res.status(200).cookie('Authorization', token, cookieOptions).json({ token, user });
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
  const user = req.user as UserType;
  if (req.body.password && !req.body.password.match(/^\$2[ayb]\$.{56}$/)) {
    user.password = bcrypt.hashSync(req.user?.password as string, 10);
  }
  await User.findByIdAndUpdate(user._id, user);
  const token = createToken(JSON.stringify(user));
  res.cookie('Authorization', token, cookieOptions).status(200).json({ token, user });
}));

export default authRouter;
