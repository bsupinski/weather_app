import * as model from "./model.js";
import currentView from "./views/currentView.js";

const body = document.querySelector("body");

const userLocation = async function () {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};

const successCallBack = async function (position) {
  try {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude].toString();
    await model.fetchWeather(coords);
    renderWeather();
    if ((model.state.current.currDayNight = 0))
      body.classList.toggle("dayBackground");
    else body.classList.toggle("nightBackground");
  } catch (error) {
    console.log(error);
  }
};
const errorCallBack = (error) => {
  console.error(error);
};

const renderWeather = function () {
  currentView.render(model.state);
  currentView.airQualityColor(model.state.current.currAirQuality);
};

window.addEventListener("load", userLocation);
