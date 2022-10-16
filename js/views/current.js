class CurrentView {
  _parentElement = document.querySelector(".current");
  _data;

  _createMarkup() {
    return `
    <div class="container">
      <div class="current">
        <div class="current__geographic | mb-med">
          <div class="current__geographic__location">
            <h3 class="current__geographic__location__name | mb-sm">${
              this._data.location.locName
            }</h3>
            <h3 class="current__geographic__location__region margin-bottom | mb-sm">${
              this._data.location.locRegion
            }</h3>
            <h4 class="current__geographic__location__country">
            ${this._data.location.locCountry}
            </h4>
          </div>
          <div class="current__geographic__time">
            <h3 class="current__geographic__time__day | mb-sm">${
              this._data.locDateTime.split(" ")[0]
            }</h3>
            <h3 class="current__geographic__time__time | mb-sm">${this._data.location.locTime
              .split(" ")
              .splice(1)
              .join("")}
            </h3>
            <h3 class="current__geographic__time__date">${this._data.location.locDateTime
              .split(" ")
              .splice(1)
              .join(" ")}
            </h3>
          </div>
        </div>
        <div class="current__title title">
          <h1>Current</h1>
        </div>
        <div class="current__weather | mb-med">
          <div class="current__weather__icon">
            <img src="icons/Clear0.svg" alt=""/>
          </div>
          <div class="current__weather__text">
            <div class="current__weather__text__low">
              <h4>L:${this._data.forcast.minTemp}&#176</h4>
            </div>
            <div class="current__weather__text__info">
              <h2 class="current__weather__text__info__condition m-bottom-sm">${
                this._data.current.currWeather
              }</h2>
              <h4 class="current__weather__text__info__tempature | mb-xsm">${
                this._data.current.currTempF
              }&#176</h4>
              <h4 class="current__weather__text__info__feelsLike">
                Feels like:${this._data.current.currFeelsLike}&#176
              </h4>
            </div>
            <div class="current__weather__high">
              <h4>H:${this._data.forcast.maxTemp}&#176</h4>
            </div>
          </div>
        </div>
        <div class="current__weather__air">
          <div class="current__weather__air__wind">
            <h4 class="mb-sm">Wind</h4>
            <p class="mb-xsm">${this_data.current.currWindSpeed}mph</p>
            <p class="mb-xsm">${this_data.current.currWindDirection}</p>
          </div>
          <div class="current__weather__air__gust">
            <h4 class="mb-sm">Gust</h4>
            <p class="mb-xsm">${this_data.current.currWindGust}mph</p>
          </div>
          <div class="current__weather__air__visibility">
            <h4  class="mb-sm">Visibility</h4>
            <p class="mb-xsm">$${this_data.current.currVisibility}miles</p>
          </div>
          <div class="current__weather__air__quality">
            <h4 class="mb-sm">Air Quality</h4>
            <p class="mb-xsm">${this_data.current.currWindSpeed}</p>
          </div>
          <div class="current__weather__air__humidity">
            <h4 class="mb-sm">Humidity</h4>
            <p class="mb-xsm">${this_data.current.currHumidity}</p>
          </div>
        </div>
      </div>
    `;
  }
}
