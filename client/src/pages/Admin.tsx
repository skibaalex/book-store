/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';
import { BookState, initializeBooks } from '../store/reducers/booksReducer';
import { RootState, useDispatch, useSelector } from '../store';
import { Book } from '../types';

export interface AdminProps {

}

interface BookAccordionProps{
  book: Book
}

const BookAccordion: FC<BookAccordionProps> = ({ book }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [publishAt, setPublishAt] = useState(book.publishedAt);
  const [price, setPrice] = useState(book.price);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  return (
    <div className="row">
      <div className="book-accordion">
        <div className="row">
          <div className="col-3">
            <h1>{title}</h1>
          </div>
          <div className="col-3">
            <p className="author">{`${author} ${publishAt ? `, ${publishAt}` : ''}`}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-2 image">
            <img width="70%" src="https://images-na.ssl-images-amazon.com/images/I/41x4tuvyQOS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg" alt="product" />
          </div>
          <div className="col-2 book-details">
            {!edit
              ? (
                <>
                  <h4 className="price">
                    {price}
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
                      {description}
                    </p>
                  </div>
                </>
              )
              : (
                <h1>Edit</h1>
              )}
            {edit
              ? (
                <>
                  <button onClick={() => setEdit((prev) => !prev)} type="button" className="btn success">Save</button>
                  <button onClick={() => setEdit((prev) => !prev)} type="button" className="btn">Cancel</button>
                </>
              )

              : <button onClick={() => setEdit((prev) => !prev)} type="button" className="btn">Edit</button>}
          </div>
        </div>

      </div>
    </div>
  );
};

const Admin: FC<AdminProps> = () => {
  // eslint-disable-next-line max-len
  const { allIds, allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isInitialized) { dispatch(initializeBooks()); }
  }, [dispatch, allIds]);
  return (
    <div className="container">
      <h2>Admin Pannel</h2>
      {allIds.map((id) => (
        <BookAccordion book={allBooksById[id]} key={id} />
      ))}
    </div>
  );
};

export default Admin;
