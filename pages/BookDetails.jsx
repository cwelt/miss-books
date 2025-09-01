import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;

export function BookDetails() {
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
      });
  }

  if (!book) return <div>Loading book details...</div>;
  const authors =
    book.authors && book.authors.length ? book.authors.join(", ") : "Unknown";
  const authorsTitle =
    book.authors && book.authors.length > 1 ? "Authors" : "Author";
  const categories =
    book.categories && book.categories.length
      ? book.categories.join(", ")
      : "Unknown";
  const isOnSale = book.listPrice && book.listPrice.isOnSale;

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
              <strong>Published:</strong> {book.publishedDate}
            </li>
            <li>
              <strong>Pages:</strong> {book.pageCount}
            </li>
            <li>
              <strong>Language:</strong> {book.language}
            </li>
            <li>
              <strong>Categories:</strong> {categories}
            </li>
          </ul>

          <div className="price">
            <strong>
              Price: {book.listPrice ? book.listPrice.amount : ""}{" "}
              {book.listPrice ? book.listPrice.currencyCode : ""}
            </strong>
            {isOnSale && <span className="on-sale">On Sale!</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
