const copyrightyear = document.getElementById("currentyear");
const today = new Date();

//set copyright sate in the footer:
copyrightyear.innerHTML = today.getFullYear(); 

//shorthand version of the same code: 
//const today = new Date().getFullYear();
//document.querySelector("#currentyear").innerHTML = today.getFullYear();

//Set last modified information:
document.getElementById("lastmodified").innerHTML = `Last Modification: ${document.lastModified}`;