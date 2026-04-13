// scripts/form.mjs
const params = new URLSearchParams(window.location.search);
const entry = params.get("journalEntry");

const output = document.getElementById("output");
if (entry) {
  const today = new Date();
  const formatted = today.toLocaleDateString(); // ej: 11/04/2026
  output.textContent = `${formatted} – ${entry}`;
} else {
  output.textContent = "No entry submitted.";
}