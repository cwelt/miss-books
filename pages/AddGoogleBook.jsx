import { googleBookService } from "../services/google-book.service.js";
import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";

const { useState, useEffect, useRef } = React;

export function AddGoogleBook(onAdd) {
  const debounceDelayMS = 1200;
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const handleSearchBooksDebounce = useRef(
    utilService.debounce(handleSearchBooks, debounceDelayMS)
  ).current;

  useEffect(() => {
    if (query) handleSearchBooksDebounce(query);
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted with: ", query);
    handleSearchBooks(query);
  }

  // performs request to google API with the query input
  function handleSearchBooks(query) {
    console.log("Submitting request to google API with ", query);
    // pass the query input to google book service and set search results to response
    googleBookService.query(query).then((bookData) => {
      console.log("response from google service:", bookData);
      setSearchResults(bookData);
    });
  }

  // handles the add button to add a new google book to book list DB
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

  // render
  return (
    <React.Fragment>
      <section className="google-search-section">
        <form className="google-search-form" onSubmit={handleSubmit}>
          <label htmlFor="google-search-input" className="google-search-label">
            Search Books
          </label>
          <input
            id="google-search-input"
            type="text"
            placeholder="Search books by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="google-search-input"
          />
          <button type="submit" className="google-search-button">
            Search
          </button>
        </form>
      </section>

      {searchResults && searchResults.length > 0 && (
        <section className="google-results-section">
          <h2 className="google-results-title">Search Results</h2>
          <table className="google-results-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Publish Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((book) => (
                <tr key={book.id}>
                  <td>
                    <h4 className="google-book-title">
                      {book.volumeInfo.title}
                    </h4>
                    <p className="google-book-subtitle">
                      {book.volumeInfo.subtitle}
                    </p>
                  </td>
                  <td>
                    {(book.volumeInfo.authors &&
                      book.volumeInfo.authors.join(", ")) ||
                      "N/A"}
                  </td>
                  <td>
                    {(book.volumeInfo.publishedDate &&
                      book.volumeInfo.publishedDate.substr(0, 4)) ||
                      "N/A"}
                  </td>
                  <td>
                    <button
                      className="google-add-button"
                      onClick={() => handleAddBook(book)}
                      title="Add book to book list."
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </React.Fragment>
  );
}
