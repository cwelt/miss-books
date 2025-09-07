import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

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

  const bookFormSchema = [
    { name: "title", label: "Title", type: "text" },
    { name: "subtitle", label: "Subtitle", type: "text" },
    {
      name: "authors",
      label: "Authors",
      type: "textarea",
      transform: (val) =>
        val
          .split("\n,") // split by line breaks
          .map((s) => s.trim()) // remove extra spaces
          .filter(Boolean), // remove empty lines
    },
    { name: "publishedDate", label: "Published Date", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "pageCount", label: "Page Count", type: "number" },
    {
      name: "categories",
      label: "Categories",
      type: "text",
      transform: (val) => val.split(",").map((s) => s.trim()),
    },
    { name: "amount", label: "Price", type: "number", nested: "listPrice" },
    {
      name: "currencyCode",
      label: "Currency",
      type: "text",
      nested: "listPrice",
    },
    {
      name: "isOnSale",
      label: "On Sale",
      type: "checkbox",
      nested: "listPrice",
    },
  ];

  function handleChange({ target }) {
    const { name: fieldName, type, value: rawValue, checked } = target;
    const fieldMeta = bookFormSchema.find((f) => f.name === fieldName);
    if (!fieldMeta) return;

    let value;
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
        value = rawValue;
        break;
      default:
        value = rawValue;
    }

    if (fieldMeta.transform) {
      value = fieldMeta.transform(value);
    }

    if (fieldMeta.nested) {
      setBookToEdit((prev) => ({
        ...prev,
        [fieldMeta.nested]: {
          ...prev[fieldMeta.nested],
          [fieldName]: value,
        },
      }));
    } else {
      setBookToEdit((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((savedBook) => {
        showSuccessMsg(`Book Saved (id: ${savedBook.id})`);
        console.log(`Book Saved (id: ${savedBook.id})`);
        navigate("/book/" + savedBook.id);
      })
      .catch((err) => {
        showErrorMsg("Cannot save book");
        console.log("err:", err);
      });
  }

  if (!bookToEdit) return <div>Loading book...</div>;

  return (
    <section className="book-edit">
      <form onSubmit={onSaveBook}>
        {bookFormSchema.map(({ name, label, type }) => {
          const value =
            name in bookToEdit ? bookToEdit[name] : bookToEdit.listPrice[name];

          return (
            <div
              key={name}
              className={type === "checkbox" ? "checkbox-group" : "form-group"}
            >
              <label htmlFor={name}>{label}:</label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={Array.isArray(value) ? value.join("\n") : value}
                  onChange={handleChange}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={type === "checkbox" ? undefined : value}
                  checked={type === "checkbox" ? value : undefined}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}

        <div className="form-actions">
          <button>Save 💾</button>
          <button
            type="button"
            onClick={() => navigate(`/book/${bookToEdit.id}`)}
          >
            Cancel ↻
          </button>
          <button>
            <Link to={"/book"}> Back to Book List ↩️</Link>
          </button>
        </div>
      </form>
    </section>
  );
}
