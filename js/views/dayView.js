import View from "./view.js";

class dayView extends View {
  _parentElement = document.querySelector(".five-day--wrapper");

  _fiveDayDaysFormat(date) {}

  _generateMarkup() {
    return this._data.fiveDay.map((day) => {
      return `
      <div class="five-day__day">
            <div class="five-day__day__date">
              <p>Today</p>
              <p>12/25/2022</p>
            </div>
            <div class="five-day__day__condition">
              <div class="five-day__day__condition__icon">
                <img src="icons/Clear0.svg" alt="" />
              </div>
              <div class="five-day__condition__text">
                <h3>Clear</h3>
              </div>
            </div>
            <div class="five-day__day__temp">
              <div class="five-day__day__temp__low">
                <p>L:45&#176</p>
              </div>
              <div class="five-day__day__temp__high">
                <p>H:${day.maxTempF}&#176</p>
              </div>
            </div>
            <div class="five-day__day__wind">
              <h3>Wind</h3>
              <p>8mph NW</p>
            </div>
          </div>`;
    });
  }
}
export default new dayView();
