import {
  getCurrentRead,
  addJournalEntry,
  finishCurrentRead,
  pauseCurrentRead
} from "./index.mjs";

let currentRead = getCurrentRead();
let futureReads = JSON.parse(localStorage.getItem("futureReads")) || [];
let completedReads = JSON.parse(localStorage.getItem("completedReads")) || [];

// Render del bloque Current Reading (con botones Finish/Pause)
function renderCurrent() {
  const container = document.getElementById("currentBook");
  if (!currentRead) {
    container.innerHTML = "<p>No current book selected.</p>";
    return;
  }

  const coverUrl = currentRead.cover_i
    ? `https://covers.openlibrary.org/b/id/${currentRead.cover_i}-M.jpg`
    : "./images/no-cover.png";

  container.innerHTML = `
    <div class="book-card">
      <img src="${coverUrl}" alt="Cover of ${currentRead.title}" loading="lazy">
      <h3>${currentRead.title}</h3>
      <p>${currentRead.author_name ? currentRead.author_name.join(", ") : "Unknown author"}</p>
      <p>${currentRead.first_publish_year || ""}</p>
      <button id="finishBtn">Finish</button>
      <button id="pauseBtn">Pause</button>
    </div>
  `;
}

// Render de estadísticas
function renderStats() {
  document.getElementById("statsFuture").textContent = `Books to Read: ${futureReads.length}`;
  document.getElementById("statsCompleted").textContent = `Books Read: ${completedReads.length}`;
}

// Render de la card Current Book en el Dashboard
function renderCurrentCard() {
  const current = getCurrentRead();
  const container = document.getElementById("currentCard");

  if (!current) {
    container.innerHTML = "<h2>Current Book</h2><p>No current book selected.</p>";
    return;
  }

  const coverUrl = current.cover_i
    ? `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg`
    : "./images/no-cover.png";

  container.innerHTML = `
    <h2>Current Book</h2>
    <img src="${coverUrl}" alt="Cover of ${current.title}" loading="lazy">
    <h3>${current.title}</h3>
    <p>${current.author_name ? current.author_name.join(", ") : "Unknown author"}</p>
  `;
}

// Render de la card Last Twist Result en el Dashboard
function renderTwistCard() {
  const twistResult = JSON.parse(localStorage.getItem("lastTwist")) || null;
  const container = document.getElementById("twistCard");

  if (!twistResult) {
    container.innerHTML = "<h2>Last Twist Result</h2><p>No twist performed yet.</p>";
    return;
  }

  const coverUrl = twistResult.cover_i
    ? `https://covers.openlibrary.org/b/id/${twistResult.cover_i}-M.jpg`
    : "./images/no-cover.png";

  container.innerHTML = `
    <h2>Last Twist Result</h2>
    <img src="${coverUrl}" alt="Cover of ${twistResult.title}" loading="lazy">
    <h3>${twistResult.title}</h3>
    <p>${twistResult.author_name ? twistResult.author_name.join(", ") : "Unknown author"}</p>
  `;
}

// Eventos para Finish y Pause
document.addEventListener("click", (event) => {
  if (event.target.id === "finishBtn") {
    finishCurrentRead();
    currentRead = null;
    futureReads = JSON.parse(localStorage.getItem("futureReads")) || [];
    completedReads = JSON.parse(localStorage.getItem("completedReads")) || [];
    renderCurrent();
    renderStats();
    renderCurrentCard();
  }

  if (event.target.id === "pauseBtn") {
    pauseCurrentRead();
    currentRead = null;
    futureReads = JSON.parse(localStorage.getItem("futureReads")) || [];
    completedReads = JSON.parse(localStorage.getItem("completedReads")) || [];
    renderCurrent();
    renderStats();
    renderCurrentCard();
  }
});

// Formulario de journal entries en Dashboard
const journalForm = document.getElementById("journalForm");
const journalEntryInput = document.getElementById("journalEntry");

journalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entry = journalEntryInput.value.trim();
  if (!entry || !currentRead) return;

  addJournalEntry(entry);

  // refrescar currentRead desde storage
  currentRead = getCurrentRead();

  journalEntryInput.value = "";
});

// Inicializar al cargar
renderCurrent();
renderStats();
renderCurrentCard();
renderTwistCard();


