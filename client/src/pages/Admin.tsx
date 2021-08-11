import {
  FC, useEffect, useState,
} from 'react';

import {
  IoIosStar, IoIosStarHalf, IoIosStarOutline, IoIosArrowDown, IoIosArrowUp,
  // eslint-disable-next-line import/no-unresolved
} from 'react-icons/io';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { BookState, deleteBook, initializeBooks } from '../store/reducers/booksReducer';
import { RootState, useDispatch, useSelector } from '../store';
import { Book } from '../types';

export interface AdminProps {

}

interface BookAccordionProps{
  book: Book,
  history: any
}

interface BookDetailsProps{
  book: Book,
  history: any,
}

const BookDetails:FC<BookDetailsProps> = ({ book, history }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteBook(book._id));
    enqueueSnackbar('Book was deleted', { variant: 'success' });
  };

  return (
    <div className="row">
      <div className="col-2 image">
        <img width="70%" src="https://images-na.ssl-images-amazon.com/images/I/41x4tuvyQOS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg" alt="product" />
      </div>
      <div className="col-2 book-details">
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
        <button onClick={() => history.push(`admin/edit/${book._id}`)} type="button" className="btn">Edit</button>
        <button onClick={handleDelete} type="button" className="btn btn-secondary">Delete</button>
      </div>
    </div>
  );
};

const BookAccordion: FC<BookAccordionProps> = ({ book, history }) => {
  const [show, setShow] = useState(false);
  const {
    title, author, publishedAt,
  } = book;

  return (
    <div className="row">
      <div className="book-accordion">
        <div className="row">
          <div className="col-3">
            <h1>{title}</h1>
          </div>
          <div className="col-3">
            <p className="author">{`${author} ${publishedAt ? `, ${publishedAt}` : ''}`}</p>
          </div>
          <div className="col-3">
            <div className="icon-wrap">
              <button onClick={() => setShow((prev) => !prev)} className="icon-btn" type="button">
                {show ? <IoIosArrowUp className="icon" size="24px" /> : <IoIosArrowDown className="icon" size="24px" />}
              </button>
            </div>
          </div>
        </div>
        {show && <BookDetails history={history} book={book} />}
      </div>
    </div>
  );
};

const Admin: FC<AdminProps> = () => {
  // eslint-disable-next-line max-len
  const { allIds, allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!isInitialized) { dispatch(initializeBooks()); }
  }, [dispatch, allIds]);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div className="buttons">
        <Link to="/admin/new" className="btn">New</Link>
      </div>
      {allIds.map((id) => (
        <BookAccordion book={allBooksById[id]} history={history} key={id} />
      ))}
    </div>
  );
};

export default Admin;
