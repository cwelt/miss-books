import { BookList } from "../cmps/BookList.jsx";
import { BookDetails } from "./BookDetails.jsx";
import { BookEdit } from "./BookEdit.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { bookService } from "../services/book.service.js";
import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.error("err:", err);
        // showErrorMsg("Cannot load books");
      });
  }, [filterBy]);

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        showSuccessMsg(`Book removed`);
      })
      .catch((err) => {
        console.log("err:", err);
        // showErrorMsg("Cannot remove book " + bookId);
      });
  }

  function onBookCreated(savedBook) {
    setBooks([...books, savedBook]);
    setIsEdit(false);
  }

  function onBookUpdated(savedBook) {
    setBooks(
      books.map((book) => (book.id === savedBook.id ? savedBook : book))
    );
    setSelectedBook(null);
    setIsEdit(false);
  }

  return (
    <section className="book-index">
      <h2>Its all about Books 📖</h2>
      {!selectedBook && (
        <button onClick={() => setIsEdit(true)}>Add Book</button>
      )}

      {/* For adding a book */}
      {isEdit && !selectedBook && (
        <BookEdit
          onCreated={onBookCreated}
          onCanceled={() => {
            setIsEdit(false);
          }}
        />
      )}

      {!selectedBook && (
        <section>
          <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
          <BookList
            books={books}
            onSelect={setSelectedBook}
            onRemove={onRemoveBook}
          />
        </section>
      )}
      {selectedBook && (
        <section>
          {!isEdit && (
            <section>
              <BookDetails book={selectedBook} />
              <button onClick={() => setSelectedBook(null)}>Close</button>
            </section>
          )}
          {/* For updating a book */}
          {isEdit && (
            <BookEdit
              book={selectedBook}
              onUpdated={onBookUpdated}
              onCanceled={() => {
                setIsEdit(false);
              }}
            />
          )}
          <span>Switch to {isEdit ? "view" : "edit"} </span>
          <ToggleButton val={isEdit} setVal={setIsEdit} />
        </section>
      )}
    </section>
  );
}
