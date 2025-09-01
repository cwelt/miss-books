const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

  useEffect(() => {
    onSetFilterBy(filterByToEdit); // Notify parent
  }, [filterByToEdit]);

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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { title, author, maxPrice, startYear, endYear, onSale } =
    filterByToEdit;
  const currentYear = new Date().getFullYear();

  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="title">Title: </label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="By Title"
          id="title"
          name="title"
        />
        <label htmlFor="author">Author: </label>
        <input
          value={author}
          onChange={handleChange}
          type="text"
          placeholder="By Author"
          id="author"
          name="author"
        />
        <label htmlFor="startYear">Published Since:</label>
        <input
          type="number"
          id="startYear"
          name="startYear"
          min="1900"
          max={currentYear}
          value={startYear}
          onChange={handleChange}
        />
        <label htmlFor="endYear">Published up Until:</label>
        <input
          type="number"
          id="endYear"
          name="endYear"
          min="1900"
          max={currentYear}
          value={endYear}
          onChange={handleChange}
        />
        <label htmlFor="maxPrice">Max Price: </label>
        <input
          value={maxPrice}
          onChange={handleChange}
          type="number"
          placeholder="By Max Price"
          id="maxPrice"
          name="maxPrice"
        />
        <label>
          <input
            type="checkbox"
            name="onSale"
            value={true}
            onChange={handleChange}
          />
          On Sale Only
        </label>
        <button hidden>Set Filter</button>
      </form>
    </section>
  );
}
