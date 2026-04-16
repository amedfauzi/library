const myLibrary = [];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    Book.prototype.toggleRead = function () {
        this.read = !this.read;
    };
}

function addBookToLibrary(title, author, pages) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, false);
    myLibrary.push(newBook);
    displayBook(newBook);
    return newBook;
}

function displayBook(book) {
    const bookContainer = document.getElementById("book-container");
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-id", book.id);
    bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button class="toggle-read">${book.read ? "Read" : "Not Read"}</button>
        <button class="delete-book">Delete</button>
    `;
    bookContainer.appendChild(bookElement);
}

const dialog = document.getElementById("book-dialog");
const openBtn = document.getElementById("open-dialog");
const closeBtn = document.getElementById("close-dialog");
const form = document.getElementById("book-form");

// Open dialog
openBtn.addEventListener("click", () => {
    dialog.showModal();
});

// Close dialog
closeBtn.addEventListener("click", () => {
    dialog.close();
});

// Handle form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");

    addBookToLibrary(title, author, pages);

    form.reset();
    dialog.close();
});


// Remove book
const bookContainer = document.getElementById("book-container");

function removeBook(id, bookElement) {
    const filtered = myLibrary.filter(book => book.id !== id);
    filtered.length = 0;
    myLibrary.push(...filtered);
    bookElement.remove();
}

// Read book toggle
function toggleReadStatus(id, button) {
    const book = myLibrary.find(book => book.id === id);
    if (!book) return;

    book.toggleRead();

    // update UI
    button.textContent = book.read ? "Read" : "Not Read";
}

// Event delegation for book actions
bookContainer.addEventListener("click", (e) => {
    const bookElement = e.target.closest(".book");
    if (!bookElement) return;

    const id = bookElement.dataset.id;

    if (e.target.classList.contains("toggle-read")) {
        toggleReadStatus(id, e.target);
    }

    if (e.target.classList.contains("delete-book")) {
        const confirmed = confirm("Delete this book?");
        if (!confirmed) return;

        removeBook(id, bookElement);
    }
});