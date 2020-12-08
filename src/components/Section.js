export default class Section {
  constructor(data, containerSelector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._container = document.querySelector(`${containerSelector}`);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item, inTheBegining = true) {
    if (inTheBegining) {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}
