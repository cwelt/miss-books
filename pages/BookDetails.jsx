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

  function onBack() {
    navigate("/book");
  }

  function getPageCountCategory(pageCount) {
    let category;
    if (pageCount < 100) category = "Light";
    else if (pageCount < 200) category = "Medium";
    else if (pageCount <= 500) category = "Descent";
    else category = "Serious";
    return category + " Reading";
  }

  function getPublishedDateCategory(publishedYear) {
    const currentYear = new Date().getFullYear();
    const diffYears = currentYear - publishedYear;

    if (diffYears < 1) return "New Release";
    else if (diffYears > 10) return "Vintage";
    else return null;
  }

  function getPriceCategory(price) {
    if (price < 20) return "cheap";
    else if (price <= 150) return "medium";
    else return "expensive";
  }

  if (!book)
    return (
      <div>
        <h1>Loading book details...</h1>
      </div>
    );

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
  const pageCountCategory = getPageCountCategory(book.pageCount);
  const publishedDateCategory = getPublishedDateCategory(book.publishedDate);
  const priceCategory =
    book.listPrice && getPriceCategory(book.listPrice.amount);

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
              <span className="banner"> ({publishedDateCategory})</span>
            </li>
            <li>
              <strong>Pages:</strong> {book.pageCount}{" "}
              <span className="banner"> ({pageCountCategory})</span>
            </li>
            <li>
              <strong>Language:</strong> {book.language}
            </li>
            <li>
              <strong>Categories:</strong> {categories}
            </li>
          </ul>

          <div className="price">
            <strong className={priceCategory}>
              Price:{" "}
              {isOnSale && (
                <span className="old-price"> {`  ${oldPrice}  `} </span>
              )}{" "}
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
      <button onClick={onBack}>Back</button>
    </section>
  );
}
