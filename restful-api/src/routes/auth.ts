import { Router } from 'express';

const authRouter = Router();

/**
 * Register a new User
 */
authRouter.post('/register', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Authenticate a user
 */
authRouter.post('/login', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Get the currently authenticated user
 */
authRouter.get('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Update a user
 */
authRouter.put('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Delete a user
 */
authRouter.delete('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export default authRouter;
