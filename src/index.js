
let apiKey = `79c10854b8bbfdaa4tfa826305864ob5`;
let geoNamesUsername = "mariabdelaserna";


function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".search-input");
  let city = searchInputElement.value.trim().toLowerCase();



  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

 
  axios.get(apiUrl).then(displayTemperature);
}

function getLocalTimeFromGeoNames(lat, lng, callback) {
  let geoUrl = `https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=${geoNamesUsername}`;

  axios.get(geoUrl)
    .then(function(response) {
      if (response.data && response.data.time) {
        callback(response.data.time); // returns local time as "2025-06-08 07:41"
      } else {
        console.error("GeoNames API Error:", response.data);
        callback(null);
      }
    })
    .catch(function(error) {
      console.error("GeoNames API request failed:", error);
      callback(null);
    });
}


function formatDate(timestamp, timezoneOffset) {
  let localTimestamp = ((timestamp + timezoneOffset) * 1000); 
  let date = new Date(localTimestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getUTCDay()];
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();


  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#weather-temperature-value");
    let temperature = Math.round(response.data.temperature.current);
    temperatureElement.innerHTML = temperature;
  
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = response.data.city;


  let formattedTime = formatDate(response.data.time, response.data.timezone);

  document.querySelector(".weather-conditions").innerHTML = `
    ${formattedTime}, ${response.data.condition.description} <br>
    Humidity: <span id="humidity">${response.data.temperature.humidity}%,</span>
    Wind: <span id="wind-speed">${response.data.wind.speed}km/h</span>
  `;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
console.log("Raw API response:", response);