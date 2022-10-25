import View from "./view.js";

class dayView extends View {
  _parentElement = document.querySelector(".five-day--wrapper");

  _fiveDayDaysFormat(day) {
    if (day.hourDate === this._data.location.locDateTime.split(" ")[0]) {
      console.log("today");
      return;
    }
    if (day.hourDate == this._data.location.locDateTime.split(" ")[0] + 1) {
      console.log("Tomorrow");
      return;
    } else console.log(day.hourDate);
  }

  _generateMarkup() {
    return this._data.fiveDay
      .map((day) => {
        return `
            <div class="five-day__day">
                <div class="five-day__day__date">
                  <p>Today</p>
                  <p>12/25/2022</p>
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
      })
      .join(" ");
  }
}
export default new dayView();
