
// Obtener lista desde localStorage
export function getList(listName) {
  return JSON.parse(localStorage.getItem(listName)) || [];
}

// Guardar lista en localStorage
export function saveList(listName, list) {
  localStorage.setItem(listName, JSON.stringify(list));
}

// Eliminar libro de una lista
export function removeBook(listName, title) {
  const list = getList(listName).filter(book => book.title !== title);
  saveList(listName, list);
  return list;
}

// Mover libro de futureReads a completedReads
export function markAsRead(title) {
  const futureReads = getList("futureReads");
  const completedReads = getList("completedReads");

  const book = futureReads.find(b => b.title === title);
  if (book) {
    const updatedFuture = futureReads.filter(b => b.title !== title);
    saveList("futureReads", updatedFuture);

    completedReads.push(book);
    saveList("completedReads", completedReads);
  }
}
