import { bookService } from "../services/book.service";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
const { useState } = React;

export function AddReview(bookId) {
  const [reviewToEdit, setReviewToEdit] = useState({
    fullname: "",
    rating: "",
    readAt: new Date(),
  });

  function onSaveReview(ev) {
    ev.preventDefault();
    bookService
      .addReview(bookId, reviewToEdit)
      .then(() => {
        console.log("saved review ", reviewToEdit);
        console.log(bookService.get(bookId));
        showSuccessMsg("yay, review added");
        navigate(`/book/${bookId}`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot save car!");
      });
  }
  function handleChange({ target }) {
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
    <section className="review-add">
      <h1>Add Review</h1>
      <form onSubmit={onSaveReview}>
        <label htmlFor="fullname">Full Name</label>
        <input
          onChange={handleChange}
          value={fullname}
          type="text"
          name="fullname"
          id="fullname"
        />

        <label htmlFor="rating">Rating</label>
        <select
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
        <label htmlFor="readAt">Read At</label>
        <input
          onChange={handleChange}
          value={readAt}
          type="date"
          name="readAt"
          id="readAt"
        />
        <section className="controlls">
          <button>Save</button>
        </section>
      </form>
    </section>
  );
}
