// readings-main.js
import {
  getList,
  saveList,
  removeBook,
  markAsRead,
  getCurrentRead,
  setCurrentRead,
  getLastTwist,
  setLastTwist
} from "./data.mjs";

let futureReads = getList("futureReads");
let completedReads = getList("completedReads");

// --- Generar card de libro ---
function bookCard(book, listName) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "./images/no-cover.png";

  let buttons = `
    <button class="remove-btn" data-title="${book.title}" data-list="${listName}">
      Remove
    </button>
  `;

  if (listName === "futureReads") {
    buttons += `
      <button class="mark-btn" data-title="${book.title}">
        Mark as Read
      </button>
      <button class="current-btn" data-title="${book.title}">
        Set as Current
      </button>
    `;
  } else if (listName === "completedReads") {
    buttons += `
      <button class="view-btn" data-title="${book.title}">
        View
      </button>
    `;
  }

  return `
    <div class="book-card">
      <img src="${coverUrl}" alt="Cover of ${book.title}" loading="lazy">
      <h3>${book.title}</h3>
      <p>${book.author_name ? book.author_name.join(", ") : "Unknown author"}</p>
      <p>${book.first_publish_year || ""}</p>
      ${buttons}
    </div>
  `;
}

// --- Render listas ---
function renderLists() {
  document.getElementById("futureList").innerHTML =
    futureReads.map(book => bookCard(book, "futureReads")).join("");

  document.getElementById("completedList").innerHTML =
    completedReads.map(book => bookCard(book, "completedReads")).join("");
}

// --- Event listeners de botones de las cards ---
document.addEventListener("click", (event) => {

  // Botón Remove
  if (event.target.classList.contains("remove-btn")) {
    const title = event.target.dataset.title;
    const listName = event.target.dataset.list;
    if (listName === "futureReads") {
      futureReads = removeBook("futureReads", title);
    } else if (listName === "completedReads") {
      completedReads = removeBook("completedReads", title);
    }
    renderLists();
  }

  // Botón Set as Current
  if (event.target.classList.contains("current-btn")) {
    const title = event.target.dataset.title;
    const book = futureReads.find(b => b.title === title);
    if (book) {
      setCurrentRead(book);
      futureReads = futureReads.filter(b => b.title !== title);
      saveList("futureReads", futureReads);
      renderLists();
    }
  }

  // Botón Mark as Read
  if (event.target.classList.contains("mark-btn")) {
    const title = event.target.dataset.title;
    markAsRead(title);
    futureReads = getList("futureReads");
    completedReads = getList("completedReads");
    renderLists();
  }

  // Botón View — abre modal con journal entries
  if (event.target.classList.contains("view-btn")) {
    const title = event.target.dataset.title;
    const book = completedReads.find(b => b.title === title);
    if (book) {
      modalTitle.textContent = book.title;
      modalCover.src = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "./images/no-cover.png";
      modalAuthor.textContent = book.author_name
        ? book.author_name.join(", ")
        : "Unknown author";
      modalYear.textContent = book.first_publish_year || "";
      modalNotes.textContent = book.notes || "No notes saved.";

      modalJournal.innerHTML = "";
      if (book.journal && book.journal.length > 0) {
        book.journal.forEach(entry => {
          const li = document.createElement("li");
          // cada entrada es un objeto {date, text}
          li.textContent = `${entry.date} – ${entry.text}`;
          modalJournal.appendChild(li);
        });
      } else {
        modalJournal.innerHTML = "<li>No journal entries.</li>";
      }

      viewModal.showModal();
    }
  }
});

// --- Twist ---
const twistBtn = document.getElementById("twistBtn");
const twistModal = document.getElementById("twistModal");
const twistResult = document.getElementById("twistResult");
const bookAnimation = document.getElementById("bookAnimation");
const closeModal = document.getElementById("closeModal");

twistBtn.addEventListener("click", () => {
  bookAnimation.style.display = "block";
  twistResult.style.display = "none";
  twistModal.showModal();

  setTimeout(() => {
    bookAnimation.style.display = "none";

    if (futureReads.length > 0) {
      const randomIndex = Math.floor(Math.random() * futureReads.length);
      const book = futureReads[randomIndex];

      // guardar como lastTwist en localStorage 
      setLastTwist(book);

      twistResult.textContent = `Next book: "${book.title}" by ${book.author_name ? book.author_name.join(", ") : "Unknown author"}`;
    } else {
      twistResult.textContent = "No books available in your To Read list.";
    }

    twistResult.style.display = "block";
  }, 2000);
});

closeModal.addEventListener("click", () => {
  twistModal.close();
});

// --- View Modal ---
const viewModal = document.getElementById("viewModal");
const closeViewModal = document.getElementById("closeViewModal");
const modalTitle = document.getElementById("modalTitle");
const modalCover = document.getElementById("modalCover");
const modalAuthor = document.getElementById("modalAuthor");
const modalYear = document.getElementById("modalYear");
const modalNotes = document.getElementById("modalNotes");
const modalJournal = document.getElementById("modalJournal");

closeViewModal.addEventListener("click", () => {
  viewModal.close();
});


renderLists();