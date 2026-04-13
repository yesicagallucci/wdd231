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

export function getCurrentRead() {
  const data = localStorage.getItem("currentRead");
  return data ? JSON.parse(data) : null;
}

export function addJournalEntry(entryText) {
  let current = getCurrentRead();
  if (!current) return;
  if (!current.journal) current.journal = [];
  current.journal.push({ date: new Date().toISOString().slice(0,10), text: entryText });
  localStorage.setItem("currentRead", JSON.stringify(current));
}

export function finishCurrentRead() {
  const current = getCurrentRead();
  if (!current) return;
  let completed = JSON.parse(localStorage.getItem("completedReads")) || [];
  completed.push(current);
  localStorage.setItem("completedReads", JSON.stringify(completed));
  localStorage.removeItem("currentRead");
}

export function pauseCurrentRead() {
  const current = getCurrentRead();
  if (!current) return;
  let future = JSON.parse(localStorage.getItem("futureReads")) || [];
  future.push(current);
  localStorage.setItem("futureReads", JSON.stringify(future));
  localStorage.removeItem("currentRead");
}