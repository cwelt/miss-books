import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";

export function RootCmp() {
  const { useState } = React;
  const [page, setPage] = useState("book");
  return (
    <section className="app main-layout">
      <AppHeader page={page} onSetPage={setPage} />
      <main>
        <main>
          {page === "home" && <Home />}
          {page === "about" && <About />}
          {page === "book" && <BookIndex />}
        </main>
      </main>
    </section>
  );
}
