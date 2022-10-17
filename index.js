const body = document.querySelector("body");
const currentWeatherContainer = document.querySelector(
  ".current_weather-container"
);
const key = "476826e5e2fa4241aad201532222709";

const daysOfTheWeek = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const state = {
  location: {},
  current: {},
  dayForcast: {},
  dayHourly: {},
  fiveDay: {},
};

const userLocation = async function () {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};
const successCallBack = (position) => {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude].toString();
  loadWeather(coords);
};
const errorCallBack = (error) => {
  console.error(error);
};

const createCurrentLocationObject = (data) => {
  const { location } = data;
  return {
    locName: location.name,
    locRegion: location.region,
    locCountry: location.country,
    locDateDay: new Date(location.localtime).toDateString(),
    locTime: location.localtime,
  };
};

const createCurrentWeatherObject = (data) => {
  const { current } = data;
  return {
    currDayNight: current.is_day,
    currWeather: current.condition.text,
    currWeatherIcon: current.condition.icon,
    currTempF: current.temp_f,
    currTempFeelsLike: current.feelslike_f,
    currWindSpeed: current.wind_mph,
    currWindGust: current.gust_mph,
    currWindDirection: current.wind_dir,
    currHumidity: current.humidity,
    currVisibility: current.vis_miles,
  };
};

const createCurrentDayForecast = (data) => {
  const { forecast } = data;
  return {
    maxTemp_f: forecast.forecastday[0].day.maxtemp_f,
    minTemp_f: forecast.forecastday[0].day.mintemp_f,
  };
};

// const createCurrentHourlyForecast = (data) => {
//   const { forecast } = data;
//   return forecast.forecastday[0].hour
//     .concat(forecast.forecastday[1].hour)
//     .filter((hour) => hour.time > state.location.currDayTime)
//     .map((hour) => {
//       return {
//         hourDateTime: hour.time,
//         hourTime: hour.time[0],
//         hourDate: hour.time[1],
//         hourTime: hour.time,
//         hourTempF: hour.temp_f,
//       };
//     });
// };
const createCurrentHourlyForecast = (data) => {
  const { forecast } = data;
  return forecast.forecastday[0].hour
    .concat(forecast.forecastday[1].hour)
    .filter((hour) => hour.time > state.location.locTime)
    .slice(0, 12)
    .map((hour) => {
      return {
        hourDateTime: hour.time,
        hourTime: hour.time[0],
        hourDate: hour.time[1],
        hourTime: hour.time,
        hourTempF: hour.temp_f,
      };
    });
};

const createFiveDayForecast = (data) => {
  const { forecast } = data;
  return forecast.forecastday.map((day) => {
    return {
      dayHourDate: day.date,
      dayMaxtemp_f: day.day.maxtemp_f,
    };
  });
};

const loadWeather = async function (coords) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${coords}&days=5&aqi=no&alerts=no`
    );
    const data = await response.json();
    state.location = createCurrentLocationObject(data);
    state.current = createCurrentWeatherObject(data);
    state.dayForcast = createCurrentDayForecast(data);
    state.dayHourly = createCurrentHourlyForecast(data);
    state.fiveDay = createFiveDayForecast(data);
    console.log(state.dayHourly);
    // console.log(state.fiveDay);
    // currentWeatherContainer.innerHTML = `<h1 class="current_day">${
    //   daysOfTheWeek[state.location.locDateTime.split(" ")[0]]
    // }</h1>
    // <h2 class="current__time">${state.location.locDateTime
    //   .split(" ")
    //   .splice(1)
    //   .join(" ")}</h2>
    // <h3 class="current_weather-condition">${state.current.currWeather}</h3>
    // <img class="current_weather-icon" src="icons/${state.current.currWeather}${
    //   state.current.currDayNight
    // }.svg" alt="" />
    // `;
  } catch (error) {
    console.log(error);
  }
};

userLocation();
