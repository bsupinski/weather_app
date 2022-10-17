import * as model from "./model.js";
import currentView from "./views/currentView.js";

const loadUserWeather = async function () {
  try {
    await model.userLocation();
    currentView.render(model.state);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", loadUserWeather);
