let now = new Date();
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let dateElement = document.querySelector(".dayTime");
dateElement.innerHTML = `${day} ${hour}:${minutes}`;

//Feature 2
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let citySearch = document.querySelector("#citySearch");
  cityElement.innerHTML = citySearch.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Bonus
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = 19;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);