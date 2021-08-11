import { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
// eslint-disable-next-line import/no-unresolved
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';
import { Book } from '../../types';

export interface BookCardProps {
  book: Book
}

const BookCard: FunctionComponent<BookCardProps> = ({ book }) => {
  const history = useHistory();
  const {
    title, price, author, publishedAt,
  } = book;
  return (
    <div className="book-card" role="none" onClick={() => history.push(`/book/${book._id}`)}>
      <img role="none" onClick={() => history.push(`/book/${book._id}`)} height="100%" className="book-img" src="https://images-na.ssl-images-amazon.com/images/I/41x4tuvyQOS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg" alt="book" />
      <p className="author">{`${author}, ${publishedAt}`}</p>
      <h4>{title}</h4>
      <div className="rating">
        <IoIosStar className="star" />
        <IoIosStar className="star" />
        <IoIosStar className="star" />
        <IoIosStarHalf className="star" />
        <IoIosStarOutline className="star" />
      </div>
      <p className="price">{price}</p>

    </div>
  );
};

export default BookCard;
