export class BaseView {
  _parentElement = document.querySelector("body");

  changeBgColor(time) {
    if (time == "0") this._parentElement.classList.toggle("night__background");
    if (time == "1") this._parentElement.classList.toggle("day__background");
  }
}

export default new BaseView();
