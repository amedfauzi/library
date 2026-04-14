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