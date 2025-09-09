import { googleBookService } from "../services/google-book.service.js";
import { bookService } from "../services/book.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;

export function AddGoogleBook(onAdd) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    onSearch(query);
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted with: ", query);
    onSearch(query);
  }

  function onSearch(query) {
    console.log("Searching...", query);
    // pass the query input to google book service and set search results to response
    const bookData = googleBookService.query(query);
    console.log("response from google service:", bookData);
    setSearchResults(bookData.items);
  }

  function handleAddBook(book) {
    console.log("adding book...", book);
    bookService
      .addGoogleBook(book)
      .then((addedBook) => {
        showSuccessMsg(
          `Book ${addedBook.title} (${addedBook.id}) is now available on booklist.`
        );
        //window.open(`/#/book/${addedBook.id}`, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        console.error("Could not add book", err);
        showErrorMsg(`Error occurred in attempt to add google book: ${err}`);
      });
  }

  return (
    <section className="google-book-search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Go
        </button>
      </form>

      <ul className="search-results">
        {searchResults.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-info">
              <h4>{book.volumeInfo.title}</h4>
              <button onClick={() => handleAddBook(book)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
