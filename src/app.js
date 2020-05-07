let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

//date
function formatDate(timestamp) {
  let date = new Date();
  let dateNumber = date.getDate();
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let year = date.getFullYear();

  let dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = dayList[date.getDay()];

  let monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthList[date.getMonth()];

  return `${dateNumber}/${month}/${year} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#date");

currentDate.innerHTML = formatDate();

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let year = date.getFullYear();
  return `${hours}:${minutes}`;
}

//search a city& temp

let apiKey = "03ea0e1598afa46165d4faf7e2a6e9c8";

function showWeather(response) {
  console.log(response.data.main.temp);
  document.querySelector("H1").innerHTML = response.data.name;
  tempCelsius = response.data.main.temp;
  let currentTemp = Math.round(tempCelsius);
  let tempElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");

  tempElement.innerHTML = `${currentTemp}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  
    <div class="col-2">
        <h3>
        ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"}/>
        <div class="weather-forecast-temp">
         <strong>${Math.round(forecast.main.temp_max)}°C</strong> ${Math.round(
      forecast.main.temp_min
    )}°C
        </div>
    </div>
   `;
  }
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city} & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city} & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

function weatherBerlin() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Berlin & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showForecast);
}
let buttonBerlin = document.querySelector("#Berlin");
buttonBerlin.addEventListener("click", weatherBerlin);

function weatherHongKong() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Hong Kong & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showForecast);
}
let buttonHongKong = document.querySelector("#HongKong");
buttonHongKong.addEventListener("click", weatherHongKong);

function weatherNairobi() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nairobi & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Nairobi & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showForecast);
}
let buttonNairobi = document.querySelector("#Nairobi");
buttonNairobi.addEventListener("click", weatherNairobi);

function weatherMelbourne() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Melbourne & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Melbourne & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showForecast);
}
let buttonMelbourne = document.querySelector("#Melbourne");
buttonMelbourne.addEventListener("click", weatherMelbourne);

searchCity("Sydney");

//current location

function searchLocation(position) {
  let apiKey = "03ea0e1598afa46165d4faf7e2a6e9c8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", getCurrentPosition);

//Temperature Conversion
function tempToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round((tempCelsius * 9) / 5 + 32);
  conversionC.classList.remove("active");
  conversionF.classList.add("active");
}
let conversionF = document.querySelector("#FTemp");
conversionF.addEventListener("click", tempToF);

function tempToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(tempCelsius);
  conversionC.classList.add("active");
  conversionF.classList.remove("active");
}

let conversionC = document.querySelector("#CTemp");
conversionC.addEventListener("click", tempToC);

let tempCelsius = null;

//Forecast
