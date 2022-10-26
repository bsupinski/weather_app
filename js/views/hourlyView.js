import View from "./view.js";

class hourlyView extends View {
  _parentElement = document.querySelector(".hourly--wrapper");

  _generateMarkup() {
    return this._data.hourly
      .map((hour) => {
        return `
        <div class="hourly__hour">
        <div class="hourly__hour__icon">
          <img src="icons/${this._weatherIconFormat(hour.hourCondition)}${
          hour.hourDayNight
        }.svg" alt="" />
        </div>
        <div class="hourly__hour__key-info">
          <h3>${this._timeFormat(hour.hourDateTime.split(" ")[1])}</h3>
          <h3>${hour.hourTempF}&#176</h3>
          <h3>${hour.hourCondition}</h3>
        </div>
        <div class="hourly__hour__air">
          <div class="hourly__hour__air__speed">
            <h4 class="mb-xsm">Wind</h4>
            <p class="mb-xsm">${hour.hourWind}mph</p>
            <p>NW</p>
          </div>
          <div class="hourly__hour__air__quality">
            <h4 class="mb-xsm">Air Quality</h4>
            <p class="air__quality">${this._airQuality(hour.hourAirQuality)}</p>
          </div>
        </div>
      </div>`;
      })
      .join(" ");
  }
}
export default new hourlyView();
