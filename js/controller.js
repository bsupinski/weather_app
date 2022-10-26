import * as model from "./model.js";
import baseView from "./views/view.js";
import currentView from "./views/currentView.js";
import dayView from "./views/dayView.js";
import hourView from "./views/hourlyView.js";

const airQuality = document.querySelectorAll(".currentAirQuality");

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
    if (model.state.current.currDayNight == "0")
      body.classList.toggle("nightBackground");
    if (model.state.current.currDayNight == "1")
      body.classList.toggle("dayBackground");
  } catch (error) {
    console.log(error);
  }
};
const errorCallBack = (error) => {
  console.error(error);
};

const renderWeather = function () {
  currentView.render(model.state);
  dayView.render(model.state);
  hourView.render(model.state);
};

window.addEventListener("load", userLocation);
