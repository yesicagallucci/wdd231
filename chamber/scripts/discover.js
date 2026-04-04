import { places } from "../data/caacupe.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#cards-container");

  places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("card");

    
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    const caption = document.createElement("figcaption");
    caption.textContent = place.name;
    figure.appendChild(img);
    figure.appendChild(caption);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn more";

    button.addEventListener("click", () => {
    const query = encodeURIComponent(place.name + " Caacupe Paraguay");
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
    });


   
    card.appendChild(figure);
    card.appendChild(title);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(button);

    container.appendChild(card);
  });
});
