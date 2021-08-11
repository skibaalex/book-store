import { useEffect, useState } from 'react';
import { RootState, useDispatch, useSelector } from '../store';
import BookList from '../components/books/BooksList';
import { Book } from '../types';
import { BookState, initializeBooks } from '../store/reducers/booksReducer';

const Books = () => {
  // eslint-disable-next-line max-len
  const { allIds, allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const [books, setBooks] = useState<[Book]>();
  useEffect(() => {
    if (!isInitialized) { dispatch(initializeBooks()); }
    setBooks(allIds.map((id) => allBooksById[id]) as [Book]);
  }, [dispatch, allIds]);

  return (
    <BookList path="Books" books={books!} headline="Our Collection" />
  );
};

export default Books;
