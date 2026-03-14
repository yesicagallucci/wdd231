const baseURL = "https://yesicagallucci.github.io/wdd231";
const dataURL = "https://yesicagallucci.github.io/wdd231/chamber/data/members.json";
const members = document.querySelector('#cards');

async function getMembers(){
    const response = await fetch(dataURL);
    const data = await response.json();
    console.log(data);

    displayMembers(data.companies);
}