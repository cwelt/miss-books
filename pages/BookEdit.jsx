import { bookService } from "../services/book.service.js";
//import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.bookId) loadBook();
  }, []);

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log("err:", err));
  }

  function handleChange({ target }) {
    const { name: fieldName, type, value: rawValue, checked } = target;
    let value;

    // Normalize value based on input type
    switch (type) {
      case "number":
      case "range":
        value = +rawValue || "";
        break;
      case "checkbox":
        value = checked;
        break;
      case "text":
      case "textarea":
        value = rawValue.trim();
        break;
      default:
        value = rawValue;
    }

    // Handle special fields
    if (["authors", "categories"].includes(fieldName)) {
      value = value.split(",").map((item) => item.trim());
    }

    // Handle nested listPrice fields
    if (["amount", "currencyCode", "isOnSale"].includes(fieldName)) {
      setBookToEdit((prevBook) => ({
        ...prevBook,
        listPrice: {
          ...prevBook.listPrice,
          [fieldName]: value,
        },
      }));
      return;
    }

    // Handle top-level fields
    setBookToEdit((prevBook) => ({
      ...prevBook,
      [fieldName]: value,
    }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        //showSuccessMsg(`Book Saved (id: ${savedBook.id})`);
        console.log(`Book Saved (id: ${savedBook.id})`);
        navigate("/book/" + savedBook.id);
      })
      .catch((err) => {
        //showErrorMsg("Cannot save book");
        console.log("err:", err);
      });
  }

  const {
    title = "",
    subtitle = "",
    authors = [],
    publishedDate = "",
    description = "",
    pageCount = "",
    categories = [],
    listPrice: { amount = 0, currencyCode = "USD", isOnSale = false } = {
      amount: 0,
      currencyCode: "USD",
      isOnSale: false,
    },
  } = bookToEdit;

  console.log(
    "bookToEdit:",
    bookToEdit,
    "listPrice:",
    bookToEdit.listPrice,
    "amount:",
    amount
  );

  const authorsString = authors ? authors.join(", ") : "";
  const categoriesString = categories ? categories.join(", ") : "";

  return (
    <section className="book-edit">
      <form onSubmit={onSaveBook}>
        {/* Title */}
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        {/* Subtitle */}
        <label htmlFor="subtitle">Subtitle:</label>
        <input
          onChange={handleChange}
          value={subtitle}
          type="text"
          name="subtitle"
          id="subtitle"
        />

        {/* Authors */}
        <label htmlFor="authors">Authors:</label>
        <input
          onChange={handleChange}
          value={authorsString}
          type="text"
          name="authors"
          id="authors"
        />

        {/* Published Date */}
        <label htmlFor="publishedDate">Published Date:</label>
        <input
          onChange={handleChange}
          value={publishedDate}
          type="number"
          name="publishedDate"
          id="publishedDate"
        />

        {/* Description */}
        <label htmlFor="description">Description:</label>
        <textarea
          onChange={handleChange}
          value={description}
          name="description"
          id="description"
        />

        {/* Page Count */}
        <label htmlFor="pageCount">Page Count:</label>
        <input
          onChange={handleChange}
          value={pageCount}
          type="number"
          name="pageCount"
          id="pageCount"
        />

        {/* Categories */}
        <label htmlFor="categories">Categories:</label>
        <input
          onChange={handleChange}
          value={categoriesString}
          type="text"
          name="categories"
          id="categories"
        />

        {/* Price */}
        <label htmlFor="amount">Price:</label>
        <input
          onChange={handleChange}
          value={amount}
          type="number"
          name="amount"
          id="amount"
        />

        {/* Currency */}
        <label htmlFor="currencyCode">Currency:</label>
        <input
          onChange={handleChange}
          value={currencyCode}
          type="text"
          name="currencyCode"
          id="currencyCode"
        />

        {/* On Sale */}
        <label htmlFor="isOnSale">On Sale:</label>
        <input
          onChange={handleChange}
          checked={isOnSale}
          type="checkbox"
          name="isOnSale"
          id="isOnSale"
        />

        <button>Save</button>
        <button type="button" onClick={() => navigate("/book")}>
          Cancel
        </button>
      </form>
    </section>
  );
}
