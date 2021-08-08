const BookCard = () => {
  // TODO: finish the styles
  console.log('card');
  return (
    <div className="book-card-warper">
      <div className="book-card">
        <img width="250px" height="375px" className="book-img" src="https://images-na.ssl-images-amazon.com/images/I/41x4tuvyQOS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg" alt="book" />
        <div className="card-header">
          <span className="book-title">Book Title </span>
          <span className="book-price">19.99</span>
        </div>
        <div className="book-details">
          <span className="book-author">John Dow, 1994</span>
        </div>
        <div className="book-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam tortor magna, venenatis sed nisi vel, egestas dapibus arcu.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per sed...
        </div>
      </div>
      <div className="card-footer">
        <a className="btn" href="/">MORE DETAILS</a>
        <a className="btn primary" href="/">BUY NOW</a>
      </div>
    </div>
  );
};

export default BookCard;
