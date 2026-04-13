// data.mjs - único módulo de datos de la app

// --- Listas generales ---

export function getList(listName) {
  return JSON.parse(localStorage.getItem(listName)) || [];
}

export function saveList(listName, list) {
  localStorage.setItem(listName, JSON.stringify(list));
}

export function removeBook(listName, title) {
  const list = getList(listName).filter(book => book.title !== title);
  saveList(listName, list);
  return list;
}

export function markAsRead(title) {
  const future = getList("futureReads");
  const completed = getList("completedReads");
  const book = future.find(b => b.title === title);
  if (book) {
    saveList("futureReads", future.filter(b => b.title !== title));
    saveList("completedReads", [...completed, book]);
  }
}

// --- Current read ---

export function getCurrentRead() {
  const data = localStorage.getItem("currentRead");
  return data ? JSON.parse(data) : null;
}

export function setCurrentRead(book) {
  localStorage.setItem("currentRead", JSON.stringify(book));
}

export function clearCurrentRead() {
  localStorage.removeItem("currentRead");
}

// --- Journal entries (guardadas dentro del objeto currentRead) ---

export function addJournalEntry(entryText) {
  const current = getCurrentRead();
  if (!current) return false;
  if (!current.journal) current.journal = [];
  current.journal.push({
    date: new Date().toISOString().slice(0, 10),
    text: entryText
  });
  setCurrentRead(current);
  return true;
}

// --- Finish / Pause current read ---

export function finishCurrentRead() {
  const current = getCurrentRead();
  if (!current) return;
  const completed = getList("completedReads");
  saveList("completedReads", [...completed, current]);
  clearCurrentRead();
}

export function pauseCurrentRead() {
  const current = getCurrentRead();
  if (!current) return;
  const future = getList("futureReads");
  saveList("futureReads", [...future, current]);
  clearCurrentRead();
}

// --- Last twist ---

export function getLastTwist() {
  const data = localStorage.getItem("lastTwist");
  return data ? JSON.parse(data) : null;
}

export function setLastTwist(book) {
  localStorage.setItem("lastTwist", JSON.stringify(book));
}