document.addEventListener("DOMContentLoaded", () => {
  const messageContainer = document.querySelector("#visit-message");

  // Obtener la fecha de la última visita desde localStorage
  const lastVisit = localStorage.getItem("lastVisit");

  // Fecha actual en milisegundos
  const now = Date.now();

  let message = "";

  if (!lastVisit) {
    // Primera visita
    message = "Welcome! Let us know if you have any questions.";
  } else {
    // Calcular diferencia en días
    const diff = now - parseInt(lastVisit, 10);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else if (days === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }

  // Mostrar el mensaje en el contenedor
  messageContainer.textContent = message;

  // Guardar la fecha actual como última visita
  localStorage.setItem("lastVisit", now);
});
