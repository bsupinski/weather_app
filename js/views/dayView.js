import View from "./view.js";

class dayView extends View {
  _parentElement = document.querySelector(".five-day");

  _fiveDayDaysFormat(date) {
    if (date === this._data.fiveDay[0].fiveDayDate) return "Today";
    if (date === this._data.fiveDay[1].fiveDayDate) return "Tomorrow";
    else return this._formatDate(date);
  }

  _generateMarkup() {
    return `
    <h1 class="five-day__title title | mb-lg">5 Day</h1>
    <div class="five-day--wrapper ${this._dayNight(
      this._data.current.currDayNight
    )}__border--right">
      ${this._data.fiveDay.map(this._dayMarkup.bind(this)).join(" ")}
    </div>`;
  }

  _dayMarkup(day) {
    return `
  <div class="five-day__day ${this._dayNight(
    this._data.current.currDayNight
  )}__border--bottom">
      <div class="five-day__day__date">
        <p>${this._getDay(day.fiveDayDate)}</p>
        <p>${this._fiveDayDaysFormat(day.fiveDayDate)}</p>
      </div>
      <div class="five-day__day__condition">
        <div class="five-day__day__condition__icon">
          <img src="icons/${this._weatherIconFormat(
            day.fiveDayWeather
          )}1.svg" alt="" />
        </div>
          <div class="five-day__condition__text">
          <h4>${day.fiveDayWeather}</h4>
          </div>
          </div>
          <div class="five-day__day__temp">
              <div class="five-day__day__temp__low">
              <p>L:${day.fiveDayMinTempF}&#176</p>
          </div>
          <div class="five-day__day__temp__high">
              <p>H:${day.fiveDayMaxTempF}&#176</p>
          </div>
      </div>
      <div class="five-day__day__wind">
          <h4>Wind</h4>
          <p>${day.fiveDayMaxWind}mph</p>
      </div>
  </div>`;
  }
}
export default new dayView();
