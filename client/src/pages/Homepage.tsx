import { FC } from 'react';
import BookList from '../components/books/BooksList';

export interface HomePageProps {

}

const HomePage: FC<HomePageProps> = () => (
  <BookList />
);

export default HomePage;
