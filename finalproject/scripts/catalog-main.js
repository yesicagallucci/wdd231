import { fetchBooks, renderCatalog } from "./catalog.mjs";

// Al cargar la página: mostrar 20 libros de ficción
(async () => {
  const books = await fetchBooks("fiction", 20);
  renderCatalog(books);
})();

// Filtro por género: mostrar hasta 40 libros
document.querySelectorAll(".genre-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const genre = btn.dataset.genre; // ej. "fantasy"
    const books = await fetchBooks(`subject:${genre}`, 40);
    renderCatalog(books);
  });
});
