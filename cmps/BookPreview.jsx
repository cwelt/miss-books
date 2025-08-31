export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <h2>Book Title: {book.title}</h2>
      <h3>Book Subtitle: {book.subtitle}</h3>
      <h4>Book Author: {book.authors.join(", ")}</h4>
      <img src={book.thumbnail} alt="" />
    </article>
  );
}
