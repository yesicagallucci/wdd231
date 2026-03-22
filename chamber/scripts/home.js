const baseURL = "https://yesicagallucci.github.io/wdd231";
const dataURL = "https://yesicagallucci.github.io/wdd231/chamber/data/members.json";
const members = document.querySelector("#display-members");

//Weather 

const apiKey = "199f07473f5e19edaf6cd4e9c0f2446d";
const city = "Caacupe";   // puedes cambiar la ciudad
const units = "metric";   // °C

// Current Weather
async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  const response = await fetch(url);
  const data = await response.json();
  displayCurrentWeather(data);
}

function displayCurrentWeather(data) {
  const container = document.querySelector("#weather-info");
  const temp = data.main.temp.toFixed(1);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  container.innerHTML = `
    <p><strong>${data.name}</strong></p>
    <p>Temperature: ${temp} °C</p>
    <p>Condition: ${desc}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
  `;
}

// Forecast (next 3 days at 12:00)
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  const response = await fetch(url);
  const data = await response.json();
  displayForecast(data);
}

function displayForecast(data) {
  const container = document.querySelector("#forecast-info");
  container.innerHTML = "";

  // Filtrar pronósticos de mediodía
  const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  forecastList.slice(0, 3).forEach(item => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const temp = item.main.temp.toFixed(1);
    const desc = item.weather[0].description;
    

    container.innerHTML += `
      <div class="forecast-day">
        <p><strong>${date}</strong></p>
        <p>${temp} °C - ${desc}</p>
      </div>
    `;
  });
}

// Ejecutar
getCurrentWeather();
getForecast();





//featured
async function fetchMembers() {
    const response = await fetch(dataURL);
    const data = await response.json();
    console.log(data);
   
    const allBusinesses = data.businesses;

    // Filtrar solo nivel 1 y 2
    const featured = allBusinesses.filter(b => b.membership_level === 1 || b.membership_level === 2);

    // Elegir aleatoriamente 3
    const randomSelection = featured.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Renderizar en el contenedor
    const container = document.querySelector("#members-container");
    container.innerHTML = "";

    randomSelection.forEach(business => {
        container.innerHTML += `
            <div class="member-card">
                <h3>${business.name}</h3>
                <img src="${business.image}" alt="${business.name}" style="max-width:150px;">
                <p>${business.address}</p>
                <p>${business.phone}</p>
                <a href="${business.url}" target="_blank">Visit Website</a>
                <p><strong>Level:</strong> ${business.membership_level}</p>  
            </div>
        `;
    });

}

fetchMembers();
