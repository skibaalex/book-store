import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as bookReducer } from './reducers/booksReducer';

const rootReducer = combineReducers({
  books: bookReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
