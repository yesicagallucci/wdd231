const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets); // temporary testing of data response
    displayProphets(data.prophets);
    
}



const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        // card build code goes here
        //create a section element and store it in a variable named card using createElement(),
        const card = document.createElement("section");
  
        //create an h2 element and store it in a variable named "fullName",
        const fullName = document.createElement("h2");

        //create an img element and store it in a variable named "portrait",
        const portrait = document.createElement("img");
    
    //populate the heading element with the prophet's full name using a template string to build the full name,
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    //build the image element by setting the src, alt, loading, width, and height attributes using setAttribute().
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `portrait of ${prophet.name}${prophet.lastname}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    //Using appendChild() on the section element named "card", add the heading and image elements one at a time.
    card.appendChild(fullName);
    card.appendChild(portrait);
    
    //Finally, add the section card to the "cards" div that was selected at the beginning of the script file.
    cards.appendChild(card);


        
    });
  
}

getProphetData();