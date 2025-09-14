export function AppHeader() {
  const { Link, NavLink } = ReactRouterDOM;

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <nav className="app-nav">
          <NavLink to="/home">Home 🏠</NavLink>
          <NavLink to="/about">About ℹ️</NavLink>
          <NavLink to="/book">Book List 📚</NavLink>
          <NavLink to="/add">Search Books on Web 🌐</NavLink>
          <NavLink to="/dashboard">Dashboard 📊</NavLink>
        </nav>
        <h1> Miss Books 💁🏻‍♀️ </h1>
      </section>
    </header>
  );
}
