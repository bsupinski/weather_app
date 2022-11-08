import * as model from "./model.js";
import currentView from "./views/currentView.js";
import dayView from "./views/dayView.js";
import hourView from "./views/hourlyView.js";

const body = document.querySelector("body");
const manual = document.getElementsByClassName("manual__location")[0];
const locationForm = document.getElementById("locationForm");
const location = document.getElementById("location");

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
      body.classList.toggle("night__background");
    if (model.state.current.currDayNight == "1")
      body.classList.toggle("day__background");
  } catch (error) {
    console.log(error);
  }
};
const errorCallBack = async function (error) {
  if ((GeolocationPositionError.code = 1)) {
    try {
      manual.style.visibility = "visible";
      locationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        getCoords();
      });
    } catch (error) {}
  }
};

async function getCoords() {
  const coords = location.value;

  await model.fetchWeather(coords);
  renderWeather();
  if (model.state.current.currDayNight == "0")
    body.classList.toggle("night__background");
  if (model.state.current.currDayNight == "1")
    body.classList.toggle("day__background");
  manual.style.visibility = "hidden";
}

const renderWeather = function () {
  currentView.render(model.state);
  dayView.render(model.state);
  hourView.render(model.state);
};

window.addEventListener("load", userLocation);
