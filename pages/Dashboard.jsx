const { useEffect, useState } = React;

import { Chart } from "../cmps/Chart.jsx";
import { bookService } from "../services/book.service.js";

export function Dashboard() {
  const [books, setBooks] = useState([]);
  const [bookStats, setBookStats] = useState([]);

  useEffect(() => {
    bookService.query().then(setBooks);
    bookService.getBookStats().then(setBookStats);
  }, []);

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h2>Statistics for {books.length} Books</h2>
      <h3>By Category</h3>
      <Chart data={bookStats} />
    </section>
  );
}
