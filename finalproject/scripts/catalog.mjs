// catalog.mjs
import { getList, saveList } from "./data.mjs";

// función de búsqueda con Open Library
export async function fetchBooks(query, maxResults = 20) {
  const container = document.getElementById("catalogContainer");

  // mostrar loading mientras espera
  if (container) {
    container.innerHTML = `<p class="loading-msg">Loading book catalog...</p>`;
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${maxResults}`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    if (container) {
      container.innerHTML = `<p>Could not load books. Please check your connection and try again.</p>`;
    }
    return [];
  }
}

// función para mezclar un array
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// agregar a lista To Read
// mostrar dialog de confirmación
function showConfirm(message) {
  const dialog = document.getElementById("confirmDialog");
  const msg = document.getElementById("confirmMessage");
  const closeBtn = document.getElementById("closeConfirmDialog");
  
  msg.textContent = message;
  dialog.showModal();
  
  closeBtn.addEventListener("click", () => {
    dialog.close();
  }, { once: true }); // once: true para que no acumule listeners
}

// agregar a lista To Read
function addToFuture(book) {
  const list = getList("futureReads");
  const exists = list.find(b => b.title === book.title);
  if (!exists) {
    saveList("futureReads", [...list, book]);
    showConfirm(`"${book.title}" added to your To Read list.`);
  } else {
    showConfirm(`"${book.title}" is already in your To Read list.`);
  }
}

// agregar a lista Read
function addToCompleted(book) {
  const list = getList("completedReads");
  const exists = list.find(b => b.title === book.title);
  if (!exists) {
    saveList("completedReads", [...list, book]);
    showConfirm(`"${book.title}" added to your Read list.`);
  } else {
    showConfirm(`"${book.title}" is already in your Read list.`);
  }
}
// función para renderizar resultados
export function renderCatalog(books) {
  const container = document.getElementById("catalogContainer");
  container.innerHTML = "";

  if (!books || books.length === 0) {
    container.innerHTML = "<p>No books found. Try another search.</p>";
    return;
  }

  const randomSubset = shuffleArray(books).slice(0, 20);

  randomSubset.forEach(book => {
    const title = book.title || "No title";
    const authors = book.author_name ? book.author_name.join(", ") : "Unknown author";
    const subjects = book.subject ? book.subject.slice(0, 3).join(", ") : "No category";
    const year = book.first_publish_year || "Unknown year";
    const thumbnail = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "";
    const previewLink = book.key
      ? `https://openlibrary.org${book.key}`
      : "#";

    const item = document.createElement("div");
    item.className = "book-item";
   item.innerHTML = `
      <div class="book-card">
        ${thumbnail ? `<img src="${thumbnail}" alt="Cover of ${title}">` : ""}
        <div class="book-info">
          <strong>${title}</strong><br>
          ${authors}<br>
          <em>${subjects}</em><br>
          <small>${year}</small><br>
          <a href="${previewLink}" target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
        <div class="book-actions">
          <button class="future-btn">To Read</button>
          <button class="completed-btn">Read</button>
        </div>
      </div>
    `;

    item.querySelector(".future-btn").addEventListener("click", () => addToFuture(book));
    item.querySelector(".completed-btn").addEventListener("click", () => addToCompleted(book));

    container.appendChild(item);
  });
}