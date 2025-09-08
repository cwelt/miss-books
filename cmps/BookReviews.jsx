export function BookReviews({ reviews }) {
  if (!reviews || reviews.length === 0) return;
  return (
    <section>
      <h3>Reviews:</h3>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Rating</th>
            <th>Read At</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.fullname}</td>
              <td>{"⭐".repeat(review.rating)}</td>
              <td>{review.readAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
