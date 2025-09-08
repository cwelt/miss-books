import { bookService } from "../services/book.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export function AddReview({ bookId, onAddReview }) {
  const navigate = useNavigate();
  const [reviewToEdit, setReviewToEdit] = useState({
    fullname: "",
    rating: "1",
    readAt: new Date().toISOString().split("T")[0],
  });

  function onSaveReview(ev) {
    ev.preventDefault();
    bookService
      .addReview(bookId, reviewToEdit)
      .then((book) => {
        console.log("saved review ", reviewToEdit);
        console.log(bookService.get(bookId));
        showSuccessMsg("yay, review added");
        onAddReview(book);
        navigate(`/book/${bookId}`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot save review!");
      });
  }
  function handleChange({ target }) {
    console.log(target);
    let { value, name: field } = target;
    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }));
  }

  const { fullname, rating, readAt } = reviewToEdit;
  return (
    <section className="review-add card">
      <h2 className="card-title">Add Review</h2>
      <form className="review-form" onSubmit={onSaveReview}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            className="form-input"
            onChange={handleChange}
            value={fullname}
            type="text"
            name="fullname"
            id="fullname"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={rating}
            onChange={handleChange}
          >
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="readAt">Read At</label>
          <input
            className="form-input"
            onChange={handleChange}
            value={readAt}
            type="date"
            name="readAt"
            id="readAt"
          />
        </div>

        <section className="controlls">
          <button className="btn-save">Save</button>
        </section>
      </form>
    </section>
  );
}
