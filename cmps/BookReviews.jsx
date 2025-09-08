export function BookReviews({ reviews, onRemove }) {
  if (!reviews || reviews.length === 0) return;

  return (
    <section className="book-reviews">
      <h3>Reviews:</h3>
      <table>
        <thead>
          <tr>
            <th>Reviewer Name</th>
            <th>Rating</th>
            <th>Read At</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.fullname}</td>
              <td>{"⭐".repeat(review.rating)}</td>
              <td>{review.readAt}</td>
              <td>
                <button
                  onClick={() => onRemove(review.id)}
                  title="Delete this book review."
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
