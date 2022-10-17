import * as model from "./model.js";
import currentView from "./views/currentView.js";

const userLocation = async function () {
  navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
};
const successCallBack = (position) => {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude].toString();
  model.loadWeather(coords);
};
const errorCallBack = (error) => {
  console.error(error);
};

const loadUserWeather = async function () {
  try {
    await userLocation();
    currentView.render(model.state);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", loadUserWeather);
