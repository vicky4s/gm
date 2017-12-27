export default class Map {
  constructor(items = {}) {
    this.items = items;
  }
  has(key) {
    return key in this.items;
  }
  set(key, value) {
    this.items[key] = value;
  }
  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }
  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }
  values() {
    var values = [],
      me = this;
    for (var k in me.items) {
      if (me.hasOwnProperty(k)) {
        values.push(me.items[k]);
      }
    }
    return values;
  }
  clear() {
    this.items = {};
  }
  size() {
    var me = this;
    return Object.Keys(me.items).length;
  }
  getItems() {
    return this.items;
  }
}