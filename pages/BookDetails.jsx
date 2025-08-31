export function BookDetails({ book }) {
  const authors =
    book.authors && book.authors.length ? book.authors.join(", ") : "Unknown";
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
          <strong>
            Author{book.authors && book.authors.length > 1 ? "s" : ""}:
          </strong>{" "}
          {authors}
        </p>
      </header>
      <div className="details-main">
        <figure>
          <img src={book.thumbnail} alt={book.title} />
        </figure>
        <div className="details-info">
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
