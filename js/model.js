import { KEY } from "./config.js";

const state = {
  location: {},
  current: {},
  dayForcast: {},
  dayHourly: {},
  fiveDay: {},
};

export const userLocation = async function () {
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
    locDateTime: new Date(location.localtime).toDateString(),
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
  };
};

const createCurrentDayForecast = (data) => {
  const { forecast } = data;
  return {
    maxTemp: forecast.forecastday[0].day.maxtemp_f,
    minTemp: forecast.forecastday[0].day.mintemp_f,
  };
};

const createCurrentHourlyForecast = (data) => {
  const { forecast } = data;
  let hoursLeftInDay;
  return (hoursLeftInDay = forecast.forecastday[0].hour
    .concat(forecast.forecastday[1].hour)
    .filter((hour) => hour.time > state.location.currDayTime))
    .map((hour) => {
      return {
        hourDateTime: hour.time,
        hourTime: hour.time[0],
        hourDate: hour.time[1],
        hourTime: hour.time,
        hourTemp_f: hour.temp_f,
      };
    })
    .slice(0, 12);
};

const createFiveDayForecast = (data) => {
  const { forecast } = data;
  return forecast.forecastday.map((day) => {
    return {
      hourDate: day.date,
      maxtemp_f: day.day.maxtemp_f,
    };
  });
};

const loadWeather = async function (coords) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${coords}&days=5&aqi=no&alerts=no`
    );
    const data = await response.json();
    state.location = createCurrentLocationObject(data);
    state.current = createCurrentWeatherObject(data);
    state.dayForcast = createCurrentDayForecast(data);
    state.dayHourly = createCurrentHourlyForecast(data);
    state.fiveDay = createFiveDayForecast(data);
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
