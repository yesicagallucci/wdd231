// index-main.js - Versión mínima y funcional para el dashboard

// ==================== FUNCIONES DE DATOS ====================

function getCurrentRead() {
  const data = localStorage.getItem("currentRead");
  return data ? JSON.parse(data) : null;
}

function setCurrentRead(book) {
  localStorage.setItem("currentRead", JSON.stringify(book));
}

// ==================== RENDER CURRENT BOOK (dos lugares) ====================

function renderCurrentBook() {
  const current = getCurrentRead();

  // Render en la sección "Current Reading"
  const currentBookDiv = document.getElementById("currentBook");
  if (currentBookDiv) {
    if (!current) {
      currentBookDiv.innerHTML = `<p>No current book selected yet.</p>`;
    } else {
      const coverUrl = current.cover_i 
        ? `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg` 
        : "./images/no-cover.png";

      currentBookDiv.innerHTML = `
        <div class="book-card">
          <img src="${coverUrl}" alt="${current.title}" loading="lazy">
          <h3>${current.title}</h3>
          <p>${current.author_name ? current.author_name.join(", ") : "Unknown author"}</p>
          <p>${current.first_publish_year || ""}</p>
        </div>
      `;
    }
  }

  // Render en la card del dashboard
  const currentCardDiv = document.getElementById("currentCard");
  if (currentCardDiv) {
    if (!current) {
      currentCardDiv.innerHTML = `<h2>Current Book</h2><p>No current book selected yet.</p>`;
    } else {
      const coverUrl = current.cover_i 
        ? `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg` 
        : "./images/no-cover.png";

      currentCardDiv.innerHTML = `
        <h2>Current Book</h2>
        <img src="${coverUrl}" alt="${current.title}" loading="lazy">
        <h3>${current.title}</h3>
        <p>${current.author_name ? current.author_name.join(", ") : "Unknown author"}</p>
      `;
    }
  }
}

// ==================== RENDER TWIST CARD ====================

function renderTwistCard() {
  const twistCard = document.getElementById("twistCard");
  if (!twistCard) return;

  twistCard.innerHTML = `
    <h2>Last Twist Result</h2>
    <p>No twist performed yet.</p>
    <p><small>Go to Readings → Twist to get a surprise book</small></p>
  `;
}

// ==================== INICIALIZACIÓN ====================

document.addEventListener("DOMContentLoaded", () => {
  renderCurrentBook();
  renderTwistCard();

  // Formulario simple (no rompe aunque vaya a otra página)
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      const textarea = document.getElementById("journalEntry");
      if (textarea && textarea.value.trim()) {
        console.log("Journal entry enviado:", textarea.value.trim());
        // No hacemos preventDefault porque el assignment quiere que vaya a journal-action.html
      }
    });
  }
});