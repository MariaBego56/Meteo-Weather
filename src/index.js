
let apiKey = `79c10854b8bbfdaa4tfa826305864ob5`;


function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".search-input");
  let city = searchInputElement.value.trim().toLowerCase();

  let cityElement = document.querySelector(".current-weather");
  cityElement.innerHTML = response.data.city; 

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

 
  axios.get(apiUrl).then(displayTemperature);
}


function displayTemperature(response){ 

  let temperatureElement = document.querySelector("#weather-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

