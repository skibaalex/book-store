import { FC } from 'react';
import { Book } from '../../types';
import BookCard from './BookCard';

interface BookListProps{
  books: [Book] | Book[],
  headline: string,
}

const BookList: FC<BookListProps> = ({ books, headline }) => (
  <>
    <div className="book-list container">
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
