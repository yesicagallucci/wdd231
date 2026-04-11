import { addFuture, addCompleted } from "./storage.mjs";

// función de búsqueda con Open Library
export async function fetchBooks(query, maxResults = 20) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${maxResults}`
  );
  const data = await response.json();
  return data.docs || [];
}

// función para mezclar un array
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// función para renderizar resultados de Open Library con selección aleatoria
export function renderCatalog(books) {
  const container = document.getElementById("catalogContainer");
  container.innerHTML = "";

  if (!books || books.length === 0) {
    container.innerHTML = "<p>No se encontraron libros. Intenta otra búsqueda.</p>";
    return;
  }

  // barajar resultados y tomar un subconjunto (ej. 20)
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

    // eventos de los botones
    item.querySelector(".future-btn").addEventListener("click", () => {
    addFuture(book);
    console.log("Added to the To Read list:", title);
    });

    item.querySelector(".completed-btn").addEventListener("click", () => {
    addCompleted(book);
    console.log("Added to the Book Read list:", title);
    });

    container.appendChild(item);
  });
}


