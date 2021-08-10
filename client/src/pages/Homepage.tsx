import { FC, useEffect } from 'react';
import Jumbotron from '../components/jumbotron/Jumbotron';
import BookList from '../components/books/BooksList';
import { RootState, useDispatch, useSelector } from '../store';
import { BookState, initializeBooks } from '../store/reducers/booksReducer';
import { Book } from '../types';

export interface HomePageProps {

}

const HomePage: FC<HomePageProps> = () => {
  // eslint-disable-next-line max-len
  const { allIds, allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const books: [Book] = allIds.slice(0, 4).map((id) => allBooksById[id]) as [Book];
  useEffect(() => {
    if (!isInitialized) { dispatch(initializeBooks()); }
  }, [dispatch]);
  return (
    <>
      <Jumbotron />
      {isInitialized ? <BookList headline="Featured Books" books={books} /> : <h1>Lodaing</h1>}
    </>
  );
};

export default HomePage;
