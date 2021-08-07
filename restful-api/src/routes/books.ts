import { Router } from 'express';

const booksRouter = Router();

/**
 * Create a Book
 */
booksRouter.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Update a book
 */
booksRouter.put('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Get a book by id
 */
booksRouter.get('/:id', (req, res) => {
  console.log(req.body, req.params);
  res.send(req.body);
});

/**
 * Delete a book
 * require the user to be an admin
 */
booksRouter.delete('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Purchase a book
 * require the user to be authenticated
 */
booksRouter.post('/purchase/:id', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

/**
 * Get all books by user id
 * require the user to be authenticated
 */
booksRouter.post('/purchase/:id', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export default booksRouter;
