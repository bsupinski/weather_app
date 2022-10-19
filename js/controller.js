import * as model from "./model.js";
import currentView from "./views/currentView.js";

const userLocation = async function () {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};

const successCallBack = async function (position) {
  try {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude].toString();
    await model.fetchWeather(coords);
    renderWeather();
  } catch (error) {}
};
const errorCallBack = (error) => {
  console.error(error);
};

const renderWeather = function () {
  currentView.render(model.state);
};

window.addEventListener("load", userLocation);
