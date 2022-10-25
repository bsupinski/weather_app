export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _dayFormat = (day) => {
    if (day === "Mon") return "Monday";
    if (day === "Tue") return "Tuesday";
    if (day === "Wed") return "Wednesday";
    if (day === "Thu") return "Thursday";
    if (day === "Fri") return "Friday";
    if (day === "Day") return "Saturday";
    if (day === "Sun") return "Sunday";
  };

  _weatherIconFormat(weather) {
    if (weather === "Sunny") return "Clear";
    else return weather;
  }

  _timeFormat = (time) => {
    if (time >= "00:00" && time <= "00:59")
      return `${time.slice(2, 2) + 12 + time.slice(2)} AM`;
    if (time >= "12:00" && time <= "12:59") return `${time} PM`;
    if (time >= "13:00" && time <= "23:59")
      return `${time.slice(0, 2) - 12 + time.slice(2)} PM`;
    else return `${time} AM`;
  };

  _airQuality(aq) {
    if (aq < 3) {
      return "Good";
    }
    if (aq < 5) {
      return "Unhealthy";
    } else {
      return "Hazardous";
    }
  }

  airQualityColor() {
    if ((airQuality.textConter = "Good")) {
      airQuality.style.color = "green";
      return;
    }
    if ((airQuality.textConter = "Hazardous")) {
      airQuality.style.color = "orange";
      return;
    } else {
      airQuality.style.color = "red";
      return;
    }
  }
}
