
let apiKey = "79c10854b8bbfdaa4tfa826305864ob5";


function search(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let searchInputElement = document.querySelector(".search-input");
  let city = searchInputElement.value;

}


function displayTemperature(response){ 

  let temperatureElement = document.querySelector("#weather-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;


  axios.get(apiUrl).then(displayTemperature);
}
