import { useState, useEffect, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import {
  BookState, getBookByID, newBook, updateBook,
} from '../store/reducers/booksReducer';
import { Book } from '../types';
import { RootState, useDispatch, useSelector } from '../store';

type Erros = {
  title: boolean,
  price: boolean,
  description: boolean
}

const EditBook = () => {
  const { id } = useParams<{id: string}>();
  const { enqueueSnackbar } = useSnackbar();
  // eslint-disable-next-line max-len
  const { allBooksById, isInitialized }:BookState = useSelector((state: RootState) => state.books);
  const [book, setBook] = useState<Book>();
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [publishedAt, setPublishAt] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [errors, setErrors] = useState<Erros>();
  const history = useHistory();

  const verify = () => {
    // eslint-disable-next-line no-useless-escape
    const verifyTitle = !(title!.length > 0);
    const verifyPrice = !(price! > 0);
    const verifyDescription = !(description!.length > 0);
    setErrors({ title: verifyTitle, price: verifyPrice, description: verifyDescription });
    return (!verifyTitle && !verifyPrice && !verifyDescription);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!verify()) return;
    try {
      if (title && publishedAt && price && author && description) {
        if (id) {
          await dispatch(updateBook({
            title, publishedAt, price, author, description, _id: id,
          }));
        } else {
          await dispatch(newBook({
            title, publishedAt, price, author, description, _id: id,
          }));
        }
        enqueueSnackbar(`Book ${id ? 'updated' : 'saved'}`, {
          variant: 'success',
        });
        history.push('/admin');
      }
    } catch (err) {
      enqueueSnackbar('Book title has to be unique', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (id && (!allBooksById[id] || !isInitialized)) {
      dispatch(getBookByID(id));
      if (!book) {
        setBook(allBooksById[id]);
      }
    }
    if (book) {
      setTitle(book.title);
      setPublishAt(book.publishedAt!);
      setPrice(book.price);
      setAuthor(book.author!);
      setDescription(book.description);
    }
  }, [dispatch, book, allBooksById]);

  return (
    <div className="container">
      <p className="breadcrumbs">
        <Link className="nav-link" to="/">Home /</Link>
        <Link className="nav-link" to="/admin">Admin /</Link>
        {' '}
        {book?.title ? book.title : 'New Book'}
      </p>
      <h2>Edit Form</h2>
      <div className="row">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <label htmlFor="bookTitle">
              Title
              <input id="bookTitle" name="bookTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              {errors?.title && <p className="error-message"> Title is required </p>}
            </label>
            <label htmlFor="bookAuthor">
              Author
              <input id="bookAuthor" name="bookAuthor" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </label>
            <label htmlFor="bookPrice">
              Price
              <input id="bookPrice" name="bookPrice" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              {errors?.price && <p className="error-message"> Price must be greater than 0 </p>}
            </label>
            <label htmlFor="bookPrice">
              Publish at
              <input id="bookPrice" name="bookPrice" type="text" value={publishedAt} onChange={(e) => setPublishAt(e.target.value)} />
            </label>
            <label htmlFor="bookPrice">
              Description
              <textarea id="bookPrice" name="bookPrice" value={description} onChange={(e) => setDescription(e.target.value)} />
              {errors?.description && <p className="error-message"> Description is required </p>}
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
