let navigationResponsiveButton = document.querySelector(
  ".navigation-header-responsive"
);
let navItem = document.querySelectorAll(".nav-item");

const showNavigation = (e) => {
  e.preventDefault();
  let navigationHeader = document.querySelector(".navigation-header");
  navigationHeader.classList.toggle("slide-down");
};

const smoothNavigation = function (e) {
  let linkNav = this.children;
  let linkNavHref = linkNav[0].getAttribute("href");
  let destinationScroll = document.querySelector(linkNavHref);
  let destinationOffset = destinationScroll.offsetTop;

  if (this.parentElement.classList.contains("navigation-header")) {
    navItem.forEach((n) => {
      n.classList.remove("active");
    });
    this.classList.add("active");
  }

  let offsetMinus = 60;

  switch (linkNavHref) {
    case "#kontak":
      offsetMinus = 90;
      break;
  }

  window.scrollTo({
    top: destinationOffset - offsetMinus,
    behavior: "smooth",
  });

  e.preventDefault();
};

navigationResponsiveButton.addEventListener("click", showNavigation);
navItem.forEach((nav) => {
  nav.addEventListener("click", smoothNavigation);
});

//sesion buku
const bookForm = document.querySelector(".book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const addBookButton = document.getElementById("addBook");
const showUnreadButton = document.getElementById("showUnread");
const showReadButton = document.getElementById("showRead");
const bookshelf = document.getElementById("bookshelf");
let books = [];

// Fungsi untuk menyimpan buku ke localStorage
function saveBooksToStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk memuat buku dari localStorage
function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    updateBookshelf();
  }
}

// Memuat buku dari penyimpanan lokal saat halaman dimuat
loadBooksFromStorage();

addBookButton.addEventListener("click", function () {
  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value);
  const read = document.getElementById("read").checked;

  if (title && author && year) {
    const book = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete: read,
    };

    books.push(book);
    saveBooksToStorage(); // Menyimpan buku ke localStorage
    updateBookshelf();
    clearForm();
  }
});

showUnreadButton.addEventListener("click", function () {
  const unreadBooks = books.filter((book) => !book.isComplete);
  displayBooks(unreadBooks);
});

showReadButton.addEventListener("click", function () {
  const readBooks = books.filter((book) => book.isComplete);
  displayBooks(readBooks);
});

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  document.getElementById("read").checked = false;
}

function updateBookshelf() {
  displayBooks(books);
}

function displayBooks(booksToDisplay) {
  bookshelf.innerHTML = "";

  booksToDisplay.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titlePara = document.createElement("p");
    titlePara.textContent = `Judul: ${book.title}`;
    bookDiv.appendChild(titlePara);

    const authorPara = document.createElement("p");
    authorPara.textContent = `Penulis: ${book.author}`;
    bookDiv.appendChild(authorPara);

    const yearPara = document.createElement("p");
    yearPara.textContent = `Tahun Penerbit: ${book.year}`;
    bookDiv.appendChild(yearPara);

    const markButton = document.createElement("button");
    markButton.textContent = book.isComplete
      ? "Tandai Belum Dibaca"
      : "Tandai Sudah Dibaca";
    markButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
      saveBooksToStorage(); // Menyimpan perubahan status buku ke localStorage
      updateBookshelf();
    });
    bookDiv.appendChild(markButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
      books.splice(index, 1);
      saveBooksToStorage(); // Menyimpan perubahan setelah menghapus buku
      updateBookshelf();
    });
    bookDiv.appendChild(deleteButton);

    bookshelf.appendChild(bookDiv);
  });
}

updateBookshelf();
