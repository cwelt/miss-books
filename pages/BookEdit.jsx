import { bookService } from "../services/book.service.js";
//import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState } = React;

export function BookEdit({ book, onCreated, onUpdated, onCanceled }) {
  const [bookToEdit, setBookToEdit] = useState(
    book ? { ...book } : bookService.getEmptyBook()
  );

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setBookToEdit((prevBookToEdit) => ({ ...prevBookToEdit, [field]: value }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        //showSuccessMsg(`Book Saved (id: ${savedBook.id})`);
        if (bookToEdit.id) onUpdated(savedBook);
        else onCreated(savedBook);
      })
      .catch((err) => {
        //showErrorMsg("Cannot save book");
        console.log("err:", err);
      });
  }

  const { title, author, price } = bookToEdit;

  return (
    <section className="book-edit">
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="author">Author:</label>
        <input
          onChange={handleChange}
          value={author}
          type="text"
          name="author"
          id="author"
        />

        <label htmlFor="price">Price:</label>
        <input
          onChange={handleChange}
          value={price}
          type="number"
          name="price"
          id="price"
        />

        <button>Save</button>
        <button type="button" onClick={onCanceled}>
          Cancel
        </button>
      </form>
    </section>
  );
}
