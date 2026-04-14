// index-main.js
import {
  getCurrentRead,
  setCurrentRead,
  getLastTwist,
  addJournalEntry,
  finishCurrentRead,
  pauseCurrentRead,
  getList,
  saveList
} from "./data.mjs";

// --- Render stats ---
function renderStats() {
  const future = getList("futureReads");
  const completed = getList("completedReads");

  const statsFuture = document.getElementById("statsFuture");
  const statsCompleted = document.getElementById("statsCompleted");

  if (statsFuture) statsFuture.textContent = `Books to read: ${future.length}`;
  if (statsCompleted) statsCompleted.textContent = `Books read: ${completed.length}`;
}


// --- Render current book card (dashboard) ---
function renderCurrentCard() {
  const current = getCurrentRead();
  const div = document.getElementById("currentCard");
  if (!div) return;

  if (!current) {
    div.innerHTML = `
      <h2>Current Book</h2>
      <p>No current book selected yet.</p>
    `;
    return;
  }

  const coverUrl = current.cover_i
    ? `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg`
    : "./images/no-cover.png";

  div.innerHTML = `
    <h2>Current Book</h2>
    <img src="${coverUrl}" alt="${current.title}" loading="lazy">
    <h3>${current.title}</h3>
    <p>${current.author_name ? current.author_name.join(", ") : "Unknown author"}</p>
    <div class="card-buttons">
      <button id="viewBtn">View</button>
      <button id="pauseBtn">Pause</button>
      <button id="finishBtn">Finish</button>
    </div>
  `;

  document.getElementById("viewBtn").addEventListener("click", () => {
    const current = getCurrentRead();
    if (!current) return;

    // llenar el modal con los datos del libro actual
    document.getElementById("currentModalTitle").textContent = current.title;
    document.getElementById("currentModalCover").src = current.cover_i
      ? `https://covers.openlibrary.org/b/id/${current.cover_i}-M.jpg`
      : "./images/no-cover.png";
    document.getElementById("currentModalAuthor").textContent = current.author_name
      ? current.author_name.join(", ")
      : "Unknown author";

    const journalList = document.getElementById("currentModalJournal");
    journalList.innerHTML = "";
    if (current.journal && current.journal.length > 0) {
      current.journal.slice().reverse().forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date} – ${entry.text}`;
        journalList.appendChild(li);
      });
    } else {
      journalList.innerHTML = "<li>No journal entries yet.</li>";
    }

    document.getElementById("currentModal").showModal();
  });

  document.getElementById("pauseBtn").addEventListener("click", () => {
    pauseCurrentRead();
    renderCurrentCard();
    renderStats();
  });

  document.getElementById("finishBtn").addEventListener("click", () => {
    finishCurrentRead();
    renderCurrentCard();
    renderStats();
  });
}

// --- Render twist card (dashboard) ---

function renderTwistCard() {
  const div = document.getElementById("twistCard");
  if (!div) return;

  const twist = getLastTwist();

  if (!twist) {
    div.innerHTML = `
      <h2>Next Book</h2>
      <p>No twist performed yet.</p>
      <p><small>Go to Readings → Twist to get a surprise book</small></p>
    `;
    return;
  }

  const coverUrl = twist.cover_i
    ? `https://covers.openlibrary.org/b/id/${twist.cover_i}-M.jpg`
    : "./images/no-cover.png";

  div.innerHTML = `
    <h2>Next Book</h2>
    <img src="${coverUrl}" alt="${twist.title}" loading="lazy">
    <h3>${twist.title}</h3>
    <p>${twist.author_name ? twist.author_name.join(", ") : "Unknown author"}</p>
    <div class="card-buttons">
      <button id="setCurrentBtn">Set as Current</button>
    </div>
  `;

  document.getElementById("setCurrentBtn").addEventListener("click", () => {
    const existing = getCurrentRead();
    let future = getList("futureReads");

    // si hay un libro current, devolverlo a futureReads
    if (existing) {
      future = [...future, existing];
    }

    // buscar el twist en la lista actualizada
    const book = future.find(b => b.title === twist.title);
    if (book) {
      future = future.filter(b => b.title !== twist.title);
    }

    // guardar todo
    saveList("futureReads", future);
    setCurrentRead(book || twist);

    localStorage.removeItem("lastTwist");
    renderTwistCard();
    renderCurrentCard();
    renderStats();
  });
}

// --- Formulario de journal ---
function initJournalForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", () => {
    // guarda en localStorage ANTES de que navegue a journal-action.html
    const textarea = document.getElementById("journalEntry");
    const entry = textarea.value.trim();
    if (!entry) return;

    const current = getCurrentRead();
    if (!current) return;

    addJournalEntry(entry);
    // sin preventDefault: el form navega a journal-action.html normalmente
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderCurrentCard();
  renderTwistCard();
  initJournalForm();
});

document.getElementById("closeCurrentModal").addEventListener("click", () => {
    document.getElementById("currentModal").close();
  });