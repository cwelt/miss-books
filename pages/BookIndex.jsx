import { BookList } from "../cmps/BookList.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookEdit } from "./BookEdit.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { bookService } from "../services/book.service.js";
import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useState, useEffect } = React;
const { Link, useSearchParams, Outlet } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    setSearchParams(filterBy);
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log("Problems getting books:", err);
        showErrorMsg("Problems getting books");
      });
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        showSuccessMsg(`Book '${bookId}' removed successfully`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg(`Cannot remove book '${bookId}'.`);
      });
  }

  function onRemoveAllBooks() {
    bookService.removeAllBooks();
    setBooks([]);
  }

  if (!books) return <div>Loading...</div>;
  return (
    <section className="book-index">
      <h2>Its all about Books 📖</h2>
      <button onClick={onRemoveAllBooks}> Remove All Books 🗑️ </button>
      <button>
        <Link to={"/book/edit"}>Add New Book From Scratch ✚</Link>
      </button>
      <button>
        <Link to={"/add"}>Add Books From Google Search 🌐</Link>
      </button>

      <section>
        <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
        <BookList books={books} onRemove={onRemoveBook} />
      </section>
    </section>
  );
}
