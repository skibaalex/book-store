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
}

export type BookActionType = 'UPDATE' | 'DELETE' | 'ADD_TO_CART' | 'INITIALIZE' | 'GET_BOOK_BY_ID';

export interface BookActionPayload {
    book?: Book,
    books?: [Book],
}

const initialState: BookState = {
  allBooksById: {},
  allIds: [],
  cart: [],
  isInitialized: false,
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
    bookById: (state, action: PayloadAction<BookActionPayload>) => {
      const obj = objFromArray([action.payload]);
      state.allBooksById = { obj, ...state.allBooksById };
      state.allIds = Object.keys(state.allBooksById);
      state.isInitialized = true;
    },
    addCart: (state, action: PayloadAction<BookActionPayload>) => {
      state.cart.push(action.payload as Book);
    },
    removeCart: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      state.cart = _.reject(state.cart, { _id: book!._id });
    },
    update: (state, action: PayloadAction<BookActionPayload>) => {
      const { book } = action.payload;
      state.cart = _.reject(state.cart, { _id: book!._id });
    },
  },
});

const {
  init, bookById, addCart, removeCart,
} = slice.actions;

export const { reducer } = slice;

// TODO: Handle errors

export const initializeBooks = () => async (dispatch: (arg0: any) => void) => {
  const response = await HTTP.get('books/all');
  dispatch(init({ books: response.data }));
};

export const getBookByID = (id: string) => async (dispatch: (arg0: any) => void) => {
  try {
    // return a book object and other books to feature in an array
    const response = await HTTP.get(`books/${id}`);
    dispatch(bookById({ books: [response.data.book, ...response.data.otherBooks] as [Book] }));
  } catch {
    console.error('error');
  }
};

export const addToCart = (book: Book) => async (dispatch: (arg0: any) => void) => {
  dispatch(addCart({ book }));
};

export const removeFromCart = (book: Book) => async (dispatch: (arg0: any) => void) => {
  dispatch(removeCart({ book }));
};

export const updateBook = (update: Book) => async (dispatch: (arg0: any) => void) => {
  const response = await HTTP.post('books/all', update);
  dispatch(init(response.data));
};

export const deleteBook = () => async (dispatch: (arg0: any) => void) => {
  const response = await HTTP.get('books/all');
  dispatch(init(response.data));
};
export default slice;
