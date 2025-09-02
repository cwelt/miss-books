import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadBook();
  }, [params.bookId]);

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.error("Error loading book:", err);
        navigate("/book");
      });
  }

  if (!book) return <h1>Loading book details...</h1>;

  const authors =
    book.authors && book.authors.length ? book.authors.join(", ") : "Unknown";
  const authorsTitle =
    book.authors && book.authors.length > 1 ? "Authors" : "Author";
  const categories =
    book.categories && book.categories.length
      ? book.categories.join(", ")
      : "Unknown";
  const isOnSale = book.listPrice.isOnSale;
  const oldPrice = isOnSale && Math.floor(book.listPrice.amount * 1.125);

  return (
    <section className="book-details">
      <header>
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p className="authors">
          <strong>{authorsTitle}:</strong> {authors}
        </p>
      </header>
      <div className="details-main">
        <figure>
          <img src={book.thumbnail} alt={book.title} />
        </figure>
        <div className="details-info">
          <div className="details-heading">Details</div>
          <p className="description">{book.description}</p>
          <ul>
            <li>
              <strong>Published:</strong> {book.publishedDate}{" "}
              {book.publishedDateCategory && (
                <span className="banner"> ({book.publishedDateCategory})</span>
              )}
            </li>
            <li>
              <strong>Pages:</strong> {book.pageCount}{" "}
              {book.pageCountCategory && (
                <span className="banner"> ({book.pageCountCategory})</span>
              )}
            </li>
            <li>
              <strong>Language:</strong> {book.language}
            </li>
            <li>
              <strong>Categories:</strong> {categories}
            </li>
          </ul>

          <div className="price">
            <strong className={book.listPrice.priceCategory}>
              Price:{" "}
              {isOnSale && <span className="old-price"> {`${oldPrice}`} </span>}{" "}
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </strong>
            {isOnSale && <span className="on-sale">On Sale!</span>}
          </div>
        </div>
      </div>
      <nav className="next-prev">
        <Link to={`/book/${book.prevBookId}`}> &larr; Previous Book</Link> |
        <Link to={`/book/${book.nextBookId}`}>Next Book &rarr;</Link>
      </nav>
      <hr />
      <button>
        <Link to={"/book"}> Back to Book List</Link>
      </button>
    </section>
  );
}
