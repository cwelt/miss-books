import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM;

export function BookList({ books, onRemove }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <BookPreview book={book} />
          <section>
            <button>
              <Link to={`/book/${book.id}`}>🔎</Link>
            </button>
            <button>
              <Link to={`/book/edit/${book.id}`}>✏️</Link>
            </button>
            <button onClick={() => onRemove(book.id)}>🗑️</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
