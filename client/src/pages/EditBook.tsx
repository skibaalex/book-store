import { useState, useEffect, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { BookState, getBookByID, updateBook } from '../store/reducers/booksReducer';
import { Book } from '../types';
import { RootState, useDispatch, useSelector } from '../store';

const EditBook = () => {
  const { id } = useParams<{id: string}>();
  // eslint-disable-next-line max-len
  const { allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const [book, setBook] = useState<Book>();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>();
  const [publishedAt, setPublishAt] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [author, setAuthor] = useState<string>();
  const [description, setDescription] = useState<string>();
  const history = useHistory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && publishedAt && price && author && description) {
      dispatch(updateBook({
        title, publishedAt, price, author, description, _id: id,
      }));
    }
  };
  useEffect(() => {
    if (!allBooksById[id] || !isInitialized) {
      dispatch(getBookByID(id));
    }
    if (!book) {
      setBook(allBooksById[id]);
    }
    setTitle(book?.title);
    setPublishAt(book?.publishedAt);
    setPrice(book?.price);
    setAuthor(book?.author);
    setDescription(book?.description);
    console.log(book);
  }, [dispatch, book]);

  return (
    <div className="container">
      <h2>Edit Form</h2>
      <div className="row">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <label htmlFor="bookTitle">
              Title
              <input id="bookTitle" name="bookTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label htmlFor="bookAuthor">
              Author
              <input id="bookAuthor" name="bookAuthor" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </label>
            <label htmlFor="bookPrice">
              Price
              <input id="bookPrice" name="bookPrice" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <label htmlFor="bookPrice">
              Publish at
              <input id="bookPrice" name="bookPrice" type="text" value={publishedAt} onChange={(e) => setPublishAt(e.target.value)} />
            </label>
            <label htmlFor="bookPrice">
              Description
              <textarea id="bookPrice" name="bookPrice" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <div className="buttons">
              <button type="submit" className="btn success">Save</button>
              <button onClick={() => history.push('/admin')} type="button" className="btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
