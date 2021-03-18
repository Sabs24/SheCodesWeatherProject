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
  celsiusTemperature= Math.round(response.data.main.temp);
  let temperatureElement=document.querySelector("#degrees");
  let weatherDescription=document.querySelector("#weather");
  let description=(response.data.weather[0].description);
  let windSpeed=Math.round(response.data.wind.speed);
  let windElement=document.querySelector("#windSpeed");
  let humidity=response.data.main.humidity;
  let humidityElement=document.querySelector("#humidity");
  humidityElement.innerHTML=`Humidity: ${humidity}%`;
  windElement.innerHTML=`Wind: ${windSpeed} KM/H`;
  weatherDescription.innerHTML=`${description}`;
  temperatureElement.innerHTML= `${celsiusTemperature}`;
  iconElement.setAttribute("src",
  `http://openweathermap.org/img/wn/${}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].icon);
}
function displayForecast(response){
  console.log(response.data.list[0]);
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=`my girl loves to party all the time party all the time`;  
}

function search(city){
let apiKey="59a85fc8e457f4373fc75df759a2fa3e";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
let city=document.querySelector("#citySearch").value;
search(city);
}
//let cityElement = document.querySelector("#city");
//let citySearch = document.querySelector("#citySearch");
//cityElement.innerHTML = citySearch.value;

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#degrees");
  temperatureElement.innerHTML=celsiusTemperature;
}

let celsiusTemperature=null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
function showPosition(position){
  let lon=position.coords.longitude;
  let lat=position.coords.latitude;
  alert(`${lat} ${lon}`);
}
navigator.geolocation.getCurrentPosition(showPosition);