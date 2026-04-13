// form.mjs - lee parámetros de la URL y muestra la entrada del journal

import { getCurrentRead } from "./data.mjs";

const params = new URLSearchParams(window.location.search);
const entry = params.get("journalEntry");
const output = document.getElementById("output");

const current = getCurrentRead();

if (!output) return;

if (!entry) {
  output.innerHTML = "<p>No entry submitted.</p>";
} else {
  const today = new Date().toLocaleDateString();

  // título del libro actual
  const bookTitle = current ? `<h3>Book: ${current.title}</h3>` : "";

  // entrada nueva
  let html = `
    ${bookTitle}
    <div class="journal-entry new-entry">
      <strong>${today}</strong>
      <p>${entry}</p>
    </div>
  `;

  // entradas anteriores del mismo libro
  if (current && current.journal && current.journal.length > 1) {
    html += `<h4>Previous entries:</h4>`;
    // mostramos todas menos la última (que es la que acabamos de guardar)
    const previous = current.journal.slice(0, -1);
    previous.reverse().forEach(e => {
      html += `
        <div class="journal-entry">
          <strong>${e.date}</strong>
          <p>${e.text}</p>
        </div>
      `;
    });
  }

  output.innerHTML = html;
}