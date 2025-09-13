export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId,
  makeLorem,
  makeNames,
  capitalizeWords,
  getRandomIntInclusive,
  getDayName,
  getMonthName,
  animateCSS,
  debounce,
  getTruthyValues,
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  const words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color",
    "of nature",
    "tuned",
    "to",
    "a live channel",
    "All",
    "this happened",
    "more or less",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)];
    if (size >= 1) txt += " ";
  }
  return txt;
}

function makeNames(size = 1) {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Hannah",
    "Ian",
    "Jack",
    "John",
    "Bill",
    "David",
    "Henery",
    "Michael",
    "Lucas",
    "Mia",
    "Olivia",
  ];
  const lastNames = [
    "Cohen",
    "Smith",
    "Levi",
    "Doe",
    "Johnson",
    "Jackson",
    "Jordan",
    "Turing",
    "Williams",
    "Ritchie",
    "Simpson",
    "Washington",
    "White",
    "Black",
    "Mendelson",
    "Perlman",
    "Carlsen",
  ];
  const names = [];
  let fullName,
    firstName,
    lastName = "";
  while (size > 0) {
    size--;
    firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    fullName = `${firstName} ${lastName}`;
    names.push(fullName);
  }
  return names;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getDayName(date, locale) {
  date = new Date(date);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getMonthName(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}

function capitalizeWords(str) {
  // Convert the entire string to lowercase to handle varying initial casing,
  // then split it into an array of words using space as the delimiter.
  const words = str.toLowerCase().split(" ");

  // Use the map method to iterate over each word in the array.
  const capitalizedWords = words.map((word) => {
    // Check if the word is not empty to avoid errors with multiple spaces.
    if (word.length > 0) {
      // Capitalize the first letter and concatenate it with the rest of the word.
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      // Return an empty string for empty words (resulting from multiple spaces).
      return "";
    }
  });

  // Join the capitalized words back into a single string with spaces.
  return capitalizedWords.join(" ");
}

function animateCSS(el, animation = "bounce") {
  const prefix = "animate__";
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    el.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      el.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    el.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

function debounce(func, time = 700) {
  var timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, time);
  };
}

function getTruthyValues(obj) {
  const newObj = {};
  for (const field in obj) {
    const value = obj[field];
    if (value) newObj[field] = value;
  }
  return newObj;
}
