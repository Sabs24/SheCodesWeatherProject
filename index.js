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

function showTemperature(response){
  console.log(response.data);
  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#degrees").innerHTML=Math.round(response.data.main.temp);
  //let temperature= Math.round(response.data.main.temp);
  //let temperatureElement=document.querySelector("#degrees");
  let weatherDescription=document.querySelector("#weather");
  let description=(response.data.weather[0].description);
  weatherDescription.innerHTML=`${description}`;
  //temperatureElement.innerHTML= `${temperature}ºC`;
}

function searchCity(city){
let apiKey="59a85fc8e457f4373fc75df759a2fa3e";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
let city=document.querySelector("#citySearch").value;
searchCity(city);
}
//let cityElement = document.querySelector("#city");
//let citySearch = document.querySelector("#citySearch");
//cityElement.innerHTML = citySearch.value;


function showPostion(position){
  let apiKey="59a85fc8e457f4373fc75df759a2fa3e";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton=document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);


//searchCity("New York");