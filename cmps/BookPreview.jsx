export function BookPreview({ book }) {
  const { title, subtitle, authors, thumbnail, publishedDate, listPrice } =
    book;
  const { amount, currencyCode, isOnSale } = listPrice;

  const authorsName =
    (authors && authors.length && authors.join(", ")) || "Unknown";

  return (
    <article className="book-preview">
      <header>
        <h2>{title}</h2>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        <p className="authors">
          <strong>By:</strong> {authorsName}
        </p>
      </header>

      <figure>
        <img src={thumbnail} alt={`Cover of ${title}`} />
      </figure>

      <section className="book-meta">
        <p>
          <strong>Published:</strong> {publishedDate}
        </p>
        <p>
          <strong>Price:</strong> {amount} {currencyCode}
          {isOnSale && <span className="on-sale">On Sale!</span>}
        </p>
      </section>
    </article>
  );
}
