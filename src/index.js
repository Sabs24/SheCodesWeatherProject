let now = new Date();
let min = now.getMinutes();
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

function formatHours(timestamp){
  let date= new Date(timestamp);
  let hours= date.getHours();
  if( hours<10){
    hours=`0${hours}`;
  }
  if( minutes<10){
    minutes=`0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


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
  let iconElement=document.querySelector("#currentIcon");
  
  humidityElement.innerHTML=`Humidity: ${humidity}%`;
  windElement.innerHTML=`Wind: ${windSpeed} KM/H`;
  weatherDescription.innerHTML=`${description}`;
  temperatureElement.innerHTML= `${celsiusTemperature}`;
  iconElement.setAttribute("src",
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",
  response.data.weather[0].description);
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

function displayForecast(response){
  console.log(response.data);
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index = 0; index < 6; index++) {
    forecast=response.data.list[index];
  forecastElement.innerHTML+=`
  <div class="col-2">
<h3>
${formatHours(forecast.dt*1000)}
</h3>
<img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
<div class="weather-forecast-temperature"> 
${Math.round(forecast.main.temp_max)}ºC
</div>
</div>
`;  
}
}
  

function showPosition(position){
  let lon=position.coords.longitude;
  let lat=position.coords.latitude;
  alert(`${lat} ${lon}`);
}
navigator.geolocation.getCurrentPosition(showPosition);

search("New York");