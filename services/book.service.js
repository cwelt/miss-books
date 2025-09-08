import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
_createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getBookCategories,
  removeAllBooks,
  addReview,
  removeReview,
};

/* For Debug (easy access from console):
 window.cs = bookService */

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, "i");
      books = books.filter(
        (book) => regExp.test(book.title) || regExp.test(book.subtitle)
      );
    }

    if (filterBy.author) {
      const regExp = new RegExp(filterBy.author, "i");
      books = books.filter((book) => regExp.test(book.authors.join(" ")));
    }

    if (filterBy.category) {
      const regExp = new RegExp(filterBy.category, "i");
      books = books.filter((book) => regExp.test(book.categories.join(" ")));
    }

    if (filterBy.maxPrice) {
      books = books.filter(
        (book) => book.listPrice.amount <= filterBy.maxPrice
      );
    }

    if (filterBy.startYear) {
      books = books.filter((book) => book.publishedDate >= filterBy.startYear);
    }

    if (filterBy.endYear) {
      books = books.filter((book) => book.publishedDate <= filterBy.endYear);
    }

    if (filterBy.onSale) {
      books = books.filter((book) => book.listPrice.isOnSale);
    }

    return books;
  });
}

function get(bookId, enrichData = true) {
  return storageService
    .get(BOOK_KEY, bookId)
    .then(_setNextPrevBookId)
    .then((book) => {
      if (enrichData) book = _enrichBookDetails(book);
      return book;
    });
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function removeAllBooks() {
  return utilService.saveToStorage(BOOK_KEY, []);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(
  title = "",
  subtitle = "",
  authors = [],
  amount = 0,
  currencyCode = "USD",
  isOnSale = false,
  publishedDate = new Date().getFullYear(),
  description = "",
  pageCount = 0,
  categories = [],
  thumbnail = `http://coding-academy.org/books-photos/${Math.floor(
    Math.random() * 20 + 1
  )}.jpg`,
  language = "en"
) {
  return {
    title,
    subtitle,
    authors: [...authors],
    publishedDate,
    description,
    listPrice: {
      amount,
      currencyCode,
      isOnSale: isOnSale,
    },
    pageCount,
    categories: [...categories],
    thumbnail,
    language,
  };
}

function getDefaultFilter(
  filterBy = {
    title: "",
    author: "",
    category: "",
    maxPrice: 1000,
    startYear: 1920,
    endYear: new Date().getFullYear(),
    onSale: false,
  }
) {
  return { ...filterBy };
}

function getBookCategories() {
  return storageService.query(BOOK_KEY).then((books) => {
    const categories = [
      ...new Set(books.map((book) => [...book.categories]).flat()),
    ];
    return categories;
  });
}

function _createBooks(useDemoData = false) {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    if (useDemoData) {
      books = booksDemoData;
    } else {
      const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
      books = [];
      for (let i = 0; i < 20; i++) {
        let loremDescription = utilService.makeLorem(Math.random() * 15 + 20);
        const book = {
          id: utilService.makeId(),
          title: utilService.capitalizeWords(utilService.makeLorem(2)),
          subtitle: utilService.capitalizeWords(utilService.makeLorem(4)),
          authors: utilService.makeNames(Math.random() < 0.7 ? 1 : 2),
          publishedDate: utilService.getRandomIntInclusive(1950, 2024),
          description:
            loremDescription[0].toUpperCase() +
            loremDescription.slice(1).toLowerCase() +
            ".",
          pageCount: utilService.getRandomIntInclusive(20, 600),
          categories: [
            ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
          ],
          thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
          language: "en",
          listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7,
          },
        };
        books.push(book);
      }
    }
  }
  //console.log("books loaded:", books);
  utilService.saveToStorage(BOOK_KEY, books);
  return books;
}

function _createBook(...args) {
  const book = getEmptyBook(...args);
  book.id = utilService.makeId();
  return book;
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextBookId = nextBook.id;
    book.prevBookId = prevBook.id;
    return book;
  });
}

function _setPageCountCategory(book) {
  if (book.pageCount < 100) book.pageCountCategory = "Light Reading";
  else if (book.pageCount < 200) book.pageCountCategory = "Medium Reading";
  else if (book.pageCount <= 500) book.pageCountCategory = "Descent Reading";
  else book.pageCountCategory = "Serious Reading";
  return book;
}

function _setPublishedDateCategory(book) {
  const currentYear = new Date().getFullYear();
  const diffYears = currentYear - book.publishedDate;
  if (diffYears < 1) book.publishedDateCategory = "New Release";
  else if (diffYears > 10) book.publishedDateCategory = "Vintage";
  else book.publishedDateCategory = null;
  return book;
}

function _setPriceCategory(book) {
  if (book.listPrice.amount < 20) {
    book.listPrice.priceCategory = "cheap";
  } else if (book.listPrice.amount <= 150) {
    book.listPrice.priceCategory = "medium";
  } else {
    book.listPrice.priceCategory = "expensive";
  }
  return book;
}

function _enrichBookDetails(book) {
  book = _setPageCountCategory(book);
  book = _setPublishedDateCategory(book);
  book = _setPriceCategory(book);
  return book;
}

function addReview(bookId, review) {
  const reviewId = utilService.makeId();
  review["id"] = reviewId;
  const book = get(bookId, false)
    .then((book) => {
      if (book.reviews) book.reviews = [...book.reviews, review];
      else book.reviews = [review];
      return book;
    })
    .then(save);
  return book;
}

function addReview(bookId, review) {
  const reviewId = utilService.makeId();
  review["id"] = reviewId;
  const book = get(bookId, false)
    .then((book) => {
      if (book.reviews) book.reviews = [...book.reviews, review];
      else book.reviews = [review];
      return book;
    })
    .then(save);
  return book;
}

function removeReview(bookId, reviewId) {
  return get(bookId, false)
    .then((book) => {
      book.reviews = book.reviews.filter((review) => review.id !== reviewId);
      console.log("updated reviews:", book.reviews);
      return book;
    })
    .then(save)
    .catch((err) => {
      console.log(`error removing review ${reviewId} for book ${bookId}:`, err);
      throw err;
    });
}

const booksDemoData = [
  {
    id: "OXeMG8wNskc",
    title: "metus hendrerit",
    subtitle: "mi est eros convallis auctor arcu dapibus himenaeos",
    authors: ["Barbara Cartland"],
    publishedDate: 1999,
    description:
      "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
    pageCount: 713,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/20.jpg",
    language: "en",
    listPrice: {
      amount: 109,
      currencyCode: "EUR",
      isOnSale: false,
    },
  },
  {
    id: "JYOJa2NpSCq",
    title: "morbi",
    subtitle: "lorem euismod dictumst inceptos mi",
    authors: ["Barbara Cartland"],
    publishedDate: 1978,
    description:
      "aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor",
    pageCount: 129,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/14.jpg",
    language: "sp",
    listPrice: {
      amount: 44,
      currencyCode: "EUR",
      isOnSale: true,
    },
  },
  {
    id: "1y0Oqts35DQ",
    title: "at viverra venenatis",
    subtitle: "gravida libero facilisis rhoncus urna etiam",
    authors: ["Dr. Seuss"],
    publishedDate: 1999,
    description:
      "lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant",
    pageCount: 972,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/2.jpg",
    language: "he",
    listPrice: {
      amount: 108,
      currencyCode: "ILS",
      isOnSale: false,
    },
  },
  {
    id: "kSnfIJyikTP",
    title: "dictum",
    subtitle:
      "augue eu consectetur class curabitur conubia ligula in ullamcorper",
    authors: ["Danielle Steel"],
    publishedDate: 1978,
    description:
      "interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam",
    pageCount: 303,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/16.jpg",
    language: "en",
    listPrice: {
      amount: 30,
      currencyCode: "EUR",
      isOnSale: true,
    },
  },
  {
    id: "f4iuVmbuKCC",
    title: "sem himenaeos aptent",
    subtitle: "interdum per habitasse luctus purus est",
    authors: ["Dr. Seuss"],
    publishedDate: 2011,
    description:
      "et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed",
    pageCount: 337,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/12.jpg",
    language: "sp",
    listPrice: {
      amount: 19,
      currencyCode: "USD",
      isOnSale: false,
    },
  },
  {
    id: "U2rfZO6oBZf",
    title: "mi ante posuere",
    subtitle:
      "sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus",
    authors: ["Leo Tolstoy"],
    publishedDate: 1978,
    description:
      "senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in",
    pageCount: 748,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/1.jpg",
    language: "en",
    listPrice: {
      amount: 91,
      currencyCode: "USD",
      isOnSale: true,
    },
  },
  {
    id: "xI0wrXaaAcq",
    title: "non",
    subtitle:
      "leo tortor per dapibus mattis ut conubia porttitor ligula viverra",
    authors: ["Leo Tolstoy"],
    publishedDate: 2011,
    description:
      "nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque",
    pageCount: 65,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/14.jpg",
    language: "he",
    listPrice: {
      amount: 90,
      currencyCode: "USD",
      isOnSale: false,
    },
  },
  {
    id: "9laHCEdSpFy",
    title: "tristique",
    subtitle: "consectetur a eu tincidunt condimentum amet nisi",
    authors: ["Dr. Seuss"],
    publishedDate: 1999,
    description:
      "magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem",
    pageCount: 299,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/11.jpg",
    language: "he",
    listPrice: {
      amount: 176,
      currencyCode: "EUR",
      isOnSale: false,
    },
  },
  {
    id: "nGhVwZvGCGp",
    title: "urna ornare gravida",
    subtitle: "sem vestibulum semper convallis pharetra tempor himenaeos ut",
    authors: ["Jin Yong"],
    publishedDate: 2011,
    description:
      "porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla",
    pageCount: 803,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/10.jpg",
    language: "sp",
    listPrice: {
      amount: 116,
      currencyCode: "USD",
      isOnSale: true,
    },
  },
  {
    id: "Q8Q9Lsd03BD",
    title: "consequat neque volutpat",
    subtitle: "vel quis taciti fermentum feugiat ullamcorper curae praesent",
    authors: ["Dr. Seuss"],
    publishedDate: 1978,
    description:
      "curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare",
    pageCount: 891,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/5.jpg",
    language: "en",
    listPrice: {
      amount: 145,
      currencyCode: "EUR",
      isOnSale: false,
    },
  },
  {
    id: "bd7a76kARao",
    title: "risus",
    subtitle: "pretium bibendum pharetra curabitur quisque dictumst",
    authors: ["Danielle Steel"],
    publishedDate: 2018,
    description:
      "auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus",
    pageCount: 86,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/16.jpg",
    language: "sp",
    listPrice: {
      amount: 157,
      currencyCode: "ILS",
      isOnSale: true,
    },
  },
  {
    id: "qKyG0vqeO3e",
    title: "interdum etiam vulputate",
    subtitle: "velit sapien eget tincidunt nunc tortor",
    authors: ["Danielle Steel"],
    publishedDate: 2018,
    description:
      "aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad",
    pageCount: 882,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/17.jpg",
    language: "sp",
    listPrice: {
      amount: 57,
      currencyCode: "USD",
      isOnSale: true,
    },
  },
  {
    id: "2RvT48ZNInj",
    title: "sagittis justo",
    subtitle: "etiam primis proin praesent placerat nisi fermentum nisi",
    authors: ["Agatha Christie"],
    publishedDate: 2011,
    description:
      "nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus",
    pageCount: 598,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/8.jpg",
    language: "en",
    listPrice: {
      amount: 167,
      currencyCode: "ILS",
      isOnSale: false,
    },
  },
  {
    id: "5z2s9pDXAYj",
    title: "quam ullamcorper himenaeos",
    subtitle: "ut placerat eu dapibus sapien sodales laoreet",
    authors: ["Danielle Steel"],
    publishedDate: 1999,
    description:
      "etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam",
    pageCount: 608,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/3.jpg",
    language: "he",
    listPrice: {
      amount: 150,
      currencyCode: "USD",
      isOnSale: true,
    },
  },
  {
    id: "zBZu5cDEWha",
    title: "quis",
    subtitle: "suscipit turpis etiam turpis libero lobortis",
    authors: ["Jin Yong"],
    publishedDate: 2011,
    description:
      "etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor",
    pageCount: 583,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/6.jpg",
    language: "en",
    listPrice: {
      amount: 58,
      currencyCode: "ILS",
      isOnSale: true,
    },
  },
  {
    id: "aOI7tQuPZ2f",
    title: "aliquam aliquet dapibus",
    subtitle:
      "neque eu purus euismod placerat adipiscing odio egestas consequat",
    authors: ["Leo Tolstoy"],
    publishedDate: 2011,
    description:
      "dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt",
    pageCount: 497,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/7.jpg",
    language: "en",
    listPrice: {
      amount: 78,
      currencyCode: "USD",
      isOnSale: false,
    },
  },
  {
    id: "WBooB82Uvwu",
    title: "class",
    subtitle:
      "elit enim ultricies amet imperdiet a molestie class elementum venenatis",
    authors: ["Danielle Steel"],
    publishedDate: 1999,
    description:
      "rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla",
    pageCount: 804,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/10.jpg",
    language: "en",
    listPrice: {
      amount: 118,
      currencyCode: "ILS",
      isOnSale: false,
    },
  },
  {
    id: "xm1z5bbZjlS",
    title: "vitae",
    subtitle: "class habitant at commodo semper ligula a bibendum",
    authors: ["Leo Tolstoy"],
    publishedDate: 1999,
    description:
      "himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus",
    pageCount: 231,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/12.jpg",
    language: "he",
    listPrice: {
      amount: 60,
      currencyCode: "EUR",
      isOnSale: false,
    },
  },
  {
    id: "u3j6QIKLlJb",
    title: "rhoncus vivamus",
    subtitle: "nullam class risus amet senectus scelerisque etiam curabitur",
    authors: ["Agatha Christie"],
    publishedDate: 1978,
    description:
      "torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis",
    pageCount: 652,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/20.jpg",
    language: "he",
    listPrice: {
      amount: 110,
      currencyCode: "USD",
      isOnSale: true,
    },
  },
  {
    id: "vxYYYdVlEH3",
    title: "donec mi ullamcorper",
    subtitle:
      "varius malesuada augue molestie sollicitudin faucibus mi eu tempus",
    authors: ["William Shakespeare"],
    publishedDate: 2011,
    description:
      "aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed",
    pageCount: 904,
    categories: ["Computers", "Hack"],
    thumbnail: "http://coding-academy.org/books-photos/2.jpg",
    language: "sp",
    listPrice: {
      amount: 186,
      currencyCode: "ILS",
      isOnSale: true,
    },
  },
];
