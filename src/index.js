
let apiKey = `79c10854b8bbfdaa4tfa826305864ob5`;


function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".search-input");
  let city = searchInputElement.value.trim().toLowerCase();



  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

 
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000); 
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();


  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector("#weather-temperature-value").innerHTML = temperature;

  document.querySelector("#city-name").innerHTML = response.data.city;

  let formattedTime = formatDate(response.data.time);

  document.querySelector(".weather-conditions").innerHTML = `
    ${formattedTime}, ${response.data.condition.description} <br>
    Humidity: <span id="humidity">${response.data.temperature.humidity}%,</span>
    Wind: <span id="wind-speed">${response.data.wind.speed}km/h</span>
  `;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

