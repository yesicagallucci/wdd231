const levels = [
    {
      id: "np",
      title: "NP Membership",
      info: "NP Membership is for non-profit organizations and there is no fee.",
      benefits: [
        "Free membership for non-profits",
        "Access to community events",
        "Networking opportunities"
      ],
      price: "Free"
    },
    {
      id: "bronze",
      title: "Bronze Membership",
      info: "Bronze Membership offers entry-level benefits at a low cost.",
      benefits: [
        "Access to general events",
        "Small event discounts",
        "Inclusion in member directory"
      ],
      price: 50000 
    },
    {
      id: "silver",
      title: "Silver Membership",
      info: "Silver Membership provides more benefits and visibility.",
      benefits: [
        "Access to training sessions",
        "Medium event discounts",
        "Advertising opportunities"
      ],
      price: 100000
    },
    {
      id: "gold",
      title: "Gold Membership",
      info: "Gold Membership offers premium benefits and maximum visibility.",
      benefits: [
        "Spotlight positions on homepage",
        "Priority access to events",
        "Premium advertising packages"
      ],
      price: 150000
    }
  ];

function renderCards(levels) {
    const container = document.getElementById("membership-cards");
    container.innerHTML = "";
    
        
    levels.forEach(level => {
        const card = document.createElement("div");
        card.classList.add("cardnp");

        const nameElement = document.createElement("h3");
        nameElement.textContent = `${level.title} level`;
        card.appendChild(nameElement);

        const button = document.createElement("button");
        button.textContent = "Learn More";
        button.classList.add("learnmore");
        card.appendChild(button);

        //const price = document.createElement("p");
        //price.textContent = `Price: Gs. ${level.price}`;
        //card.appendChild(price);


          button.addEventListener("click", () => {
            showLevelDetails(level);
         });

        document.querySelector("#membership-cards").appendChild(card);
        
    });
}

renderCards(levels);

function showLevelDetails(level) {

    const listItems = level.benefits
        .map(benefit => `<li
        >${benefit}</li>`)
        .join("");
    const modal = document.getElementById(`modal-${level.id}`);
    modal.innerHTML =`
    <button id = "closeModal">x</button>
    <h3>${level.title}</h3>
    <ul>${listItems}</ul>
    <p>Price: Gs.${level.price}
    `;
    modal.showModal();

    document.querySelector("#closeModal").addEventListener("click", () => {
        modal.close();
    });
}



document.addEventListener("DOMContentLoaded", () => {
  const tsField = document.getElementById("formTimestamp");
  tsField.value = new Date().toISOString(); // guarda fecha y hora actual
});

