//catalog-main.js
import { fetchBooks, renderCatalog } from "./catalog.mjs";

// Al cargar la página: mostrar 40 libros de ficción (aleatorios)
(async () => {
  const books = await fetchBooks("fiction", 40); // pedimos más y luego se seleccionan 20 aleatorios
  renderCatalog(books);
})();

// Filtro por género: mostrar hasta 60 libros (aleatorios)
document.querySelectorAll(".genre-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const genre = btn.dataset.genre;
    const books = await fetchBooks(`subject:${genre}`, 60); // pedimos más para tener variedad
    renderCatalog(books);
  });
});

// Search bar: buscar libros por texto
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recargar la página
  const query = input.value.trim();
  if (!query) return;

  const books = await fetchBooks(query, 50); // pedimos resultados
  renderCatalog(books); // mostramos en el catálogo
});

