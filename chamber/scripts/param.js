//const getString = window.location.search;
//console.log(getString);

//const myInfo = URLSearchParams(getString);

//or in a single line of code:
//const myInfo = new URLSearchParams(window.location.search);


// Captura los parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Obtiene cada campo requerido
const fname = params.get("fname");
const lname = params.get("lname");
const email = params.get("email");
const phone = params.get("phone");
const business = params.get("business");
const timestamp = params.get("formTimestamp");

// Construye el HTML con estilo
const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = `
  <section class="confirmation-card">
    <h3>Application Details</h3>
    <p><strong>First Name:</strong> ${fname}</p>
    <p><strong>Last Name:</strong> ${lname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Number:</strong> ${phone}</p>
    <p><strong>Business Name:</strong> ${business}</p>
    <p><strong>Submitted At:</strong> ${timestamp}</p>
  </section>
`;

