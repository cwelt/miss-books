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

  function getPageCountCategory(pageCount) {
    let category;
    if (pageCount < 100) category = "Light";
    else if (pageCount < 200) category = "Medium";
    else if (pageCount <= 500) category = "Descent";
    else category = "Serious";
    return category + " Reading";
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
              <span className="banner">
                {" "}
                ({getPageCountCategory(book.pageCount)})
              </span>
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
