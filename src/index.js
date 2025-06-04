let city="Sidney";
let apiKey="79c10854b8bbfdaa4tfa826305864ob5";
let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=${metric}`;


function displayTemperature(response){

  let temperatureElement = document.querySelector("#weather-temperature-value");
  temperatureElement.innerHTML = response.data.temperature.current;
}

axios.get(apiUrl).then(displayTemperature);