// inicializar listas desde localStorage
export let futureReads = JSON.parse(localStorage.getItem("futureReads")) || [];
export let completedReads = JSON.parse(localStorage.getItem("completedReads")) || [];

// guardar listas en localStorage
export function saveLists() {
  localStorage.setItem("futureReads", JSON.stringify(futureReads));
  localStorage.setItem("completedReads", JSON.stringify(completedReads));
}

// agregar libro a futuras lecturas
export function addFuture(book) {
  futureReads.push(book);
  saveLists();
}

// agregar libro a ya leídos
export function addCompleted(book) {
  completedReads.push(book);
  saveLists();
}

// opcional: renderizar listas en contenedores HTML
export function renderLists(futureContainerId, completedContainerId) {
  const futureEl = document.getElementById(futureContainerId);
  const completedEl = document.getElementById(completedContainerId);

  if (futureEl) {
    futureEl.innerHTML = futureReads.map(b => `<li>${b.title}</li>`).join("");
  }
  if (completedEl) {
    completedEl.innerHTML = completedReads.map(b => `<li>${b.title}</li>`).join("");
  }
}
