import { FC } from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';

interface BookListProps{
  books: [Book],
  headline: string,
}

const BookList: FC<BookListProps> = ({ books, headline }) => (
  <>
    <div className="book-list container">
      <h2>{headline}</h2>
      <div className="row">
        {books
          ? books.map((book) => (
            <div key={book._id} className="col-4">
              <BookCard book={book} />
            </div>
          ))
          : <h1>Opps something went wrong</h1>}
        {}
      </div>
    </div>
  </>
);

export default BookList;
