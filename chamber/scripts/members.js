const baseURL = "https://yesicagallucci.github.io/wdd231";
const dataURL = "https://yesicagallucci.github.io/wdd231/chamber/data/members.json";
const members = document.querySelector('#cards');

async function getMembers(){
    const response = await fetch(dataURL);
    const data = await response.json();
    //console.log(data);

    displayMembers(data.businesses);
}

const displayMembers = (businesses) => {
    businesses.forEach(business => {
        //create HTML elements
        const card = document.createElement("section");
        const name = document.createElement("h3");
        const logo = document.createElement("img");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const url = document.createElement("a");
        const membership = document.createElement("p");       
        
        //Connect the content of the Json file to each html element above
        card.setAttribute("class", "card")
        logo.setAttribute("src", business.image);
        logo.setAttribute("alt", `logo of ${business.name}`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "340");
        logo.setAttribute("height", "340");
        name.textContent = `${business.name}`;
        address.textContent = `${business.address}`;
        phone.textContent = `${business.phone}`;
        url.textContent = "website"
        url.setAttribute("href", business.url);
        url.setAttribute('target', '_blank');
        membership.textContent =  `Membership level: ${business.membership_level}`

        //appened each parent with its child element/s
        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(url);
        card.appendChild(membership);
        members.appendChild(card);
        
    });
}

getMembers();
