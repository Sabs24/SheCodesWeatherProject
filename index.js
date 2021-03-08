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


//when a user searches for a city (example: New York), it should display 
//the name of the city on the result page and the current temperature of the city.
let apiKey="59a85fc8e457f4373fc75df759a2fa3e";
let cityName="Tokyo";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;


function showTemperature(response){
  console.log(response.data);
  let temperature= Math.round(response.data.main.temp);
  let temperatureElement=document.querySelector("#degrees");
  let weatherDescription=document.querySelector("#weather");
  let description=(response.data.weather[0].description);
  weatherDescription.innerHTML=`${description}`;
  temperatureElement.innerHTML= `${temperature}ºC`;
}
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get
// your GPS coordinates and display and the city and current temperature using the OpenWeather API.
axios.get(apiUrl).then(showTemperature);