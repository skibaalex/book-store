import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import BookCard from './BookCard';

interface BookListProps{
  books: [Book] | Book[],
  headline: string,
  path: string,
}

const BookList: FC<BookListProps> = ({ books, headline, path }) => (
  <>
    <div className="book-list container">
      {path.length > 0 && (
      <p className="breadcrumbs">
        <Link className="nav-link" to="/">Home /</Link>
        {' '}
        {path}
      </p>
      )}
      <h2>{headline}</h2>
      <div className="row">
        {books?.length
          ? books.map((book) => (
            <div key={book._id} className="col-4">
              <BookCard book={book} />
            </div>
          ))
          // eslint-disable-next-line react/no-unescaped-entities
          : <h1>Sorry we couldn't find any books</h1>}
        {}
      </div>
    </div>
  </>
);

export default BookList;
