export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _formatDate(apiDate) {
    let date = new Date(apiDate);
    date = new Date(
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    ).toLocaleString("en-us", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return date.replace(",", "").split(" ")[0];
  }

  _getDay(apiDate) {
    let date = new Date(apiDate);
    date = new Date(
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    );
    return this._dayFormat(date.toString().split(" ")[0]);
  }

  _dayNight(isDay) {
    if (isDay == 0) return "night";
    if (isDay == 1) return "day";
  }

  _dayFormat = (day) => {
    if (day === "Mon") return "Monday";
    if (day === "Tue") return "Tuesday";
    if (day === "Wed") return "Wednesday";
    if (day === "Thu") return "Thursday";
    if (day === "Fri") return "Friday";
    if (day === "Sat") return "Saturday";
    if (day === "Sun") return "Sunday";
  };

  _capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  _weatherIconFormat(weather) {
    if (weather === "Sunny") return "Clear";
    else return weather;
  }

  _timeFormat = (time) => {
    if (time >= "0:00" && time <= "0:59")
      return `${time.slice(2, 2) + 12 + time.slice(1)} AM`;
    if (time >= "00:00" && time <= "00:59")
      return `${time.slice(2, 2) + 12 + time.slice(2)} AM`;
    if (time >= "1:00" && time <= "1:59") return `${time} AM`;
    if (time >= "12:00" && time <= "12:59") return `${time} PM`;
    if (time >= "13:00" && time <= "23:59")
      return `${time.slice(0, 2) - 12 + time.slice(2)} PM`;
    else return `${time} AM`;
  };

  _timeStartsZero(time) {
    if (time[0] == 0) return time.slice(1);
    else return time;
  }

  _airQuality(aq) {
    if (aq < 3) {
      return "good";
    }
    if (aq < 5) {
      return "unhealthy";
    } else {
      return "hazardous";
    }
  }
}
