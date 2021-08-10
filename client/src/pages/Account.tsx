import { useState, useEffect } from 'react';
import { Book } from '../types';
import useAuth from '../hooks/useAuth';
import BookList from '../components/books/BooksList';
import { BookState } from '../store/reducers/booksReducer';
import { RootState, useSelector } from '../store';

const Account = () => {
  const { user, isAuthenticated } = useAuth();
  const [books, setBooks] = useState<Book[]>();
  const { myBooks }:BookState = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (isAuthenticated) { setBooks(myBooks); }
  }, [isAuthenticated, user, myBooks]);
  if (!books) {
    return (
      <h1>Loading</h1>
    );
  }
  return (
    <BookList headline="Your Books" books={books!} />
  );
};

export default Account;
