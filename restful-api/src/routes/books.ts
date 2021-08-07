import { Router, Request, Response } from 'express';
import authenticate, { isAdmin } from '../helpers/authenticate';
import asyncHandler from '../helpers/asyncHandler';
import Book from '../models/Book';
import { CustomError } from '../helpers/errorHandle';
import User from '../models/User';

const booksRouter = Router();

/**
 * Get all books that a user purchased
 * require the user to be authenticated
 */
booksRouter.get('/purchased', authenticate, asyncHandler(async (req: Request, res: Response) => {
  console.log(req.user!._id);
  const books = await User.findById(req.user!._id).populate('books').select(['books', '-_id']);
  if (!books) throw new CustomError('Oops something went wrong', 500);
  res.status(200).send(books);
}));

/**
 * Create a Book
 */
booksRouter.post('/', authenticate, isAdmin, asyncHandler(async (req: Request, res: Response) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
}));

/**
 * Update a book
 */
booksRouter.put('/:id', authenticate, isAdmin, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body);
  if (!book) throw new CustomError('Wrong id', 400);
  res.status(201).send();
}));

/**
 * Get a book by id
 */
booksRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new CustomError('Wrong id', 400);
  res.json(book);
}));

/**
 * Delete a book
 * require the user to be an admin
 */
booksRouter.delete('/:id', authenticate, isAdmin, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  const book = await Book.findById(id);
  if (!book) throw new CustomError('Wrong id', 400);
  res.status(201).send();
}));

/**
 * Purchase a book
 * require the user to be authenticated
 */
booksRouter.post('/purchase/:id', authenticate, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new CustomError('Wrong id', 400);
  const user = await User.findByIdAndUpdate(req.user!._id, { $push: { books: book._id } });
  if (!user) throw new CustomError('Oops something went wrong', 500);
  res.status(200).send(book);
}));
export default booksRouter;
