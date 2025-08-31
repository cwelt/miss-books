import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { booksDemoData } from "../assets/data/books.js";

const BOOK_KEY = "bookDB";
_createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
};

// For Debug (easy access from console):
// window.cs = bookService

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      books = books.filter((book) => regExp.test(book.title));
    }

    if (filterBy.maxPrice) {
      books = books.filter(
        (book) => book.listPrice.amount <= filterBy.maxPrice
      );
    }

    return books;
  });
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(title = "", author = "", price = 0) {
  return { title, author, price };
}

function getDefaultFilter(filterBy = { txt: "", maxPrice: 0 }) {
  return { txt: filterBy.txt, maxPrice: filterBy.maxPrice };
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    books = booksDemoData;
  }
  utilService.saveToStorage(BOOK_KEY, books);
}

function _createBook(title, author, price) {
  const book = getEmptyBook(title, author, price);
  book.id = utilService.makeId();
  return book;
}
