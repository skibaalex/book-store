import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';
import { Book } from '../types';
import HTTP from '../hooks/HTTP';
import BookCard from '../components/books/BookCard';
import { BookState, getBookByID } from '../store/reducers/booksReducer';
import { RootState, useDispatch, useSelector } from '../store';

export interface BookProps {
}

const BookDetails: FC<BookProps> = () => {
  const [book, setBook] = useState<Book | undefined>();
  const [otherBooks, setOtherBooks] = useState<[Book] | []>([]);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams<{id: string}>();
  // const history = useHistory();
  // eslint-disable-next-line max-len
  const { allIds, allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialized) { dispatch(getBookByID(id)); }
    setBook(allBooksById[id]);
  }, [dispatch, allIds]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await HTTP.get(`books/${id}`);
        setBook(response.data.book);
        setOtherBooks(response.data.otherBooks);
      } catch {
        setNotFound(true);
      }
    };
    getBook();
  }, [id]);

  if (!book) return <h1>Loading</h1>;
  if (notFound) return <h1>The book was not found</h1>;

  return (
    <div className="container">
      <p className="breadcrumbs">
        <Link className="nav-link" to="/">Home /</Link>
        {' '}
        {book.title}
      </p>
      <div className="row book">
        <div className="col-2 image">
          <img width="70%" src="https://images-na.ssl-images-amazon.com/images/I/41x4tuvyQOS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg" alt="product" />
        </div>
        <div className="col-2 book-details">
          <p className="author">{`${book.author} ${book.publishedAt ? `, ${book.publishedAt}` : ''}`}</p>
          <h1 className="title">
            {book.title}
          </h1>
          <h4 className="price">
            {book.price}
          </h4>
          <div className="rating">
            <IoIosStar className="star" />
            <IoIosStar className="star" />
            <IoIosStar className="star" />
            <IoIosStarHalf className="star" />
            <IoIosStarOutline className="star" />
          </div>
          <div className="book-description">
            <h3>Book Description</h3>
            <p>
              {book.description}
            </p>
          </div>
          <button type="button" className="btn">Buy Now</button>
          <button type="button" className="btn btn-secondary">Add To Cart</button>
        </div>
      </div>
      <div className="book-list container">
        <h2>Other Books</h2>
        <div className="row">
          {otherBooks.map((otherBook) => (
            <div key={otherBook._id} className="col-4">
              <BookCard book={otherBook} key={otherBook._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;