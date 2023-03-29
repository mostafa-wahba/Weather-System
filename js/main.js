let search = document.getElementById("search");
let day = document.getElementById("day");
let date = document.getElementById("date");
let tomorowDate = document.getElementById("tomorowDate");
let afterTomorowDate = document.getElementById("afterTomorowDate");
let W_location = document.getElementById("location");
let deg = document.getElementById("deg");
let degIcon = document.getElementById("deg-icon");
let condition = document.getElementById("condition");
let tomorowIcon = document.getElementById("tomorowIcon");
let tomorowMax = document.getElementById("tomorowMax");
let tomorowMin = document.getElementById("tomorowMin");
let tomorowCondition = document.getElementById("tomorowCondition");
let afterIcon = document.getElementById("afterIcon");
let afterMax = document.getElementById("afterMax");
let afterMin = document.getElementById("afterMin");
let data = [];
let futureData = [];
let d_data = [];
let element = "";
let z = ``;
let today = "";
let dayDate = "";
let dayName = "";
let monthName = "";
async function fetching() {
  element = search.value.toLowerCase();
  console.log(element);
  let http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ff8047402ac341ac83f142541231802&q=${element}`
  );
  let http2 = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ff8047402ac341ac83f142541231802&q=${element}=07112&days=7`
  );

  data = await http.json();
  futureData = await http2.json();
  return data, futureData;
}
search.addEventListener("keyup", function () {
  fetching();
  displayData(data);
  displayFutureData(futureData);
  displayDate(data);
});
function displayDate(x) {
  let dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthlist = [
    "January",
    "February",
    "March",
    "April ",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  today = new Date(x.forecast.forecastday[0].date);
  dayDate = today.getDate();
  dayName = today.getDay();
  monthName = today.getMonth();
  day.innerHTML = dayList[dayName];
  date.innerHTML = dayDate + "" + monthlist[monthName];
  tomorowDate.innerHTML = dayList[dayName + 1];
  afterTomorowDate.innerHTML = dayList[dayName + 2];
  if (dayList[dayName + 1] == undefined) {
    tomorowDate.innerHTML = dayList[0];
    afterTomorowDate.innerHTML = dayList[1];
  }
}
function displayData(x) {
  W_location.innerHTML = x.location.name;
  deg.innerHTML = x.current.temp_c + `<sup class="sign">o</sup>C`;
  degIcon.innerHTML = `<img src="${x.current.condition.icon}" alt="">`;
  condition.innerHTML = x.current.condition.text;
}
function displayFutureData(x) {
  tomorowIcon.innerHTML = `<img src="${x.forecast.forecastday[1].day.condition.icon}" alt="">`;
  tomorowMax.innerHTML =
    x.forecast.forecastday[1].day.maxtemp_c + `<sup class="sign">o</sup>C`;
  tomorowMin.innerHTML =
    x.forecast.forecastday[1].day.mintemp_c + `<sup class="sign">o</sup>`;
  tomorowCondition.innerHTML = x.forecast.forecastday[2].day.condition.text;
  afterIcon.innerHTML = `<img src="${x.forecast.forecastday[2].day.condition.icon}" alt="">`;
  afterMax.innerHTML =
    x.forecast.forecastday[2].day.maxtemp_c + `<sup class="sign">o</sup>C`;
  afterMin.innerHTML =
    x.forecast.forecastday[2].day.mintemp_c + `<sup class="sign">o</sup>`;
  afterCondition.innerHTML = x.forecast.forecastday[2].day.condition.text;
}
async function dafaultfetching() {
  let d_http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ff8047402ac341ac83f142541231802&q=cai=07112&days=7`
  );
  d_data = await d_http.json();
  displayData(d_data);
  displayFutureData(d_data);
  displayDate(d_data);
}
dafaultfetching();
