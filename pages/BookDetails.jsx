export function BookDetails({ book }) {
  return (
    <section className="book-details">
      <h1>Book Title: {book.title}</h1>
      <h2>Book Author: {book.authors.join(", ")}</h2>
      <h3>Book Subtitle: {book.subtitle}</h3>
      <p>Book Description: {book.description}</p>
      <img src={book.thumbnail} alt="" />
      <div>
        <h4>
          Price: {book.listPrice.amount} {book.listPrice.currencyCode}
        </h4>
        {book.listPrice.isOnSale && <h5>On Sale!</h5>}
      </div>
    </section>
  );
}
