export default class Section {
  constructor(data, containerSelector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._container = document.querySelector(`${containerSelector}`)
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}