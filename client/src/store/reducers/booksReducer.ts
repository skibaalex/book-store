/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import HTTP from '../../hooks/HTTP';
import objFromArray from '../../utils/objFromArray';
import { Book } from '../../types';

export interface BookState{
    allBooksById: {},
    allIds: Array<string>,
    cart: Array<Book>,
    isInitialized: boolean
    myBooks: Array<Book>
}

export type BookActionType = 'UPDATE' | 'DELETE' | 'ADD_TO_CART' | 'INITIALIZE' | 'GET_BOOK_BY_ID';

export interface BookActionPayload {
    book?: Book,
    books?: [Book],
    id?: string
}

const initialState: BookState = {
  allBooksById: {},
  allIds: [],
  cart: [],
  isInitialized: false,
  myBooks: [],
};

const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<BookActionPayload>) => {
      state.allBooksById = objFromArray(action.payload.books!);
      state.allIds = Object.keys(state.allBooksById);
      state.isInitialized = true;
    },
    addBookToMyBooks: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      if (!state.myBooks.includes(book!)) {
        state.myBooks.push(book!);
      }
    },
    addArrayToMyBooks: (state, action: PayloadAction<BookActionPayload>) => {
      const { books } = action.payload;
      const arr = books!.filter((book) => !state.myBooks.includes(book));
      state.myBooks = [...arr, ...state.myBooks];
    },
    getBooks: (state, action: PayloadAction<BookActionPayload>) => {
      const { books } = action.payload;
      const obj = objFromArray(books!);
      state.allBooksById = { ...obj, ...state.allBooksById };
      state.allIds = Object.keys(state.allBooksById);
      state.isInitialized = true;
    },
    addBook: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      const obj = objFromArray([book]);
      state.allBooksById = { ...obj, ...state.allBooksById };
      state.allIds = Object.keys(state.allBooksById);
    },
    updateBookRecord: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      state.allBooksById[book!._id] = book;
    },
    deleteBookRecord: (state, action: PayloadAction<BookActionPayload>) => {
      const { id } = action.payload;
      state.allIds = state.allIds.filter((i) => i !== id);
      delete state.allBooksById[id!];
    },
    addCart: (state, action: PayloadAction<BookActionPayload>) => {
      state.cart.push(action.payload as Book);
    },
    removeCart: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      state.cart = _.reject(state.cart, { _id: book!._id });
    },
  },
});

const {
  // eslint-disable-next-line max-len
  init, getBooks, addCart, removeCart, updateBookRecord, addBookToMyBooks, addArrayToMyBooks, deleteBookRecord, addBook,
} = slice.actions;

export const { reducer } = slice;

// TODO: Handle errors

export const initializeBooks = () => async (dispatch: (arg0: any) => void) => {
  const response = await HTTP.get('books/all');
  dispatch(init({ books: response!.data }));
};

export const getBookByID = (id: string) => async (dispatch: (arg0: any) => void) => {
  try {
    // return a book object and other books to feature in an array
    const response = await HTTP.get(`books/${id}`).catch(() => { throw new Error('something went wrong'); });
    const { book, otherBooks } = response.data;
    dispatch(getBooks({ books: [book, ...otherBooks] as [Book] }));
  } catch {
    // TODO: Handle error
  }
};

export const addToCart = (book: Book) => async (dispatch: (arg0: any) => void) => {
  dispatch(addCart({ book }));
};

export const removeFromCart = (book: Book) => async (dispatch: (arg0: any) => void) => {
  dispatch(removeCart({ book }));
};

export const buyBook = (book: Book) => async (dispatch: (arg0: any) => void) => {
  await HTTP.post(`/books/purchase/${book._id}`);
  dispatch(addBookToMyBooks({ book }));
};

export const myBooks = (books: [Book]) => async (dispatch: (arg0: any) => void) => {
  dispatch(addArrayToMyBooks({ books }));
};

export const updateBook = (update: Book) => async (dispatch: (arg0: any) => void) => {
  await HTTP.put(`/books/${update._id}`, update).catch((err) => {
    throw new Error(err);
  });
  dispatch(updateBookRecord({ book: update }));
};

export const newBook = (data: Book) => async (dispatch: (arg0: any) => void) => {
  const response = await HTTP.post<Book>('/books/', data).catch((err) => {
    throw new Error(err);
  });
  const book:Book = response.data;
  dispatch(addBook({ book }));
};

export const deleteBook = (id: string) => async (dispatch: (arg0: any) => void) => {
  await HTTP.delete(`books/${id}`);
  dispatch(deleteBookRecord({ id }));
};
export default slice;
