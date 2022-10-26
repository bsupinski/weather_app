import { KEY } from "./config.js";

export const state = {
  location: {},
  current: {},
  dayForcast: {},
  hourly: {},
  fiveDay: {},
};

const createCurrentLocationObject = (data) => {
  const { location } = data;
  return {
    locName: location.name,
    locRegion: location.region,
    locCountry: location.country,
    locDay: new Date(location.localtime).toDateString().slice(0, 3),
    locDate: new Date(location.localtime).toDateString().slice(4),
    locDateTime: location.localtime, //Used for create hourle forecast
    locTime: location.localtime.split(" ")[1],
  };
};

const createCurrentWeatherObject = (data) => {
  const { current } = data;
  return {
    currDayNight: current.is_day,
    currWeather: current.condition.text,
    currWeatherIcon: current.condition.icon,
    currTempF: parseInt(current.temp_f),
    currTempFeelsLike: parseInt(current.feelslike_f),
    currWindSpeed: parseInt(current.wind_mph),
    currWindGust: parseInt(current.gust_mph),
    currWindDirection: current.wind_dir,
    currHumidity: current.humidity,
    currVisibility: current.vis_miles,
    currAirQuality: current.air_quality["us-epa-index"],
  };
};

const createCurrentDayForecast = (data) => {
  const { forecast } = data;
  return {
    maxTemp: parseInt(forecast.forecastday[0].day.maxtemp_f),
    minTemp: parseInt(forecast.forecastday[0].day.mintemp_f),
  };
};

const createHourlyForecast = (data) => {
  const { forecast } = data;
  return forecast.forecastday[0].hour
    .concat(forecast.forecastday[1].hour)
    .filter((hour) => hour.time > state.location.locDateTime)
    .slice(0, 12)
    .map((hour) => {
      return {
        hourDayNight: hour.is_day,
        hourDateTime: hour.time,
        hourTime: hour.time[0],
        hourDate: hour.time[1],
        hourTime: hour.time,
        hourTempF: parseInt(hour.temp_f),
        hourCondition: hour.condition.text,
        hourWind: parseInt(hour.wind_mph),
        hourAirQuality: hour.air_quality["us-epa-index"],
      };
    });
};

const createFiveDayForecast = (data) => {
  const { forecast } = data;
  return forecast.forecastday.map((day) => {
    return {
      fiveDayDate: day.date,
      fiveDayMaxTempF: parseInt(day.day.maxtemp_f),
      fiveDayMinTempF: parseInt(day.day.mintemp_f),
      fiveDayMaxWind: parseInt(day.day.maxwind_mph),
      fiveDayWeather: day.day.condition.text,
      fiveDayAirQuality: day.day.air_quality["us-epa-index"],
    };
  });
};

export const fetchWeather = async function (coords) {
  try {
    const response = await fetch(
      `HTTPS://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${coords}&days=5&aqi=yes&alerts=no`
    );
    const data = await response.json();

    state.location = createCurrentLocationObject(data);
    state.current = createCurrentWeatherObject(data);
    state.dayForcast = createCurrentDayForecast(data);
    state.hourly = createHourlyForecast(data);
    state.fiveDay = createFiveDayForecast(data);
  } catch (error) {
    throw error;
  }
};
