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
function formatDate(date) {
  let dateNumber = now.getDate();
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
let now = new Date();
currentDate.innerHTML = formatDate(now);

//search a city& temp

let apiKey = "03ea0e1598afa46165d4faf7e2a6e9c8";

function showWeather(response) {
  console.log(response.data.main.temp);
  document.querySelector("H1").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
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
    "http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"
  );
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city} & appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

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
