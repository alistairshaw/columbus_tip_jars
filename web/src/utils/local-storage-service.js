export default class LocalStorageService {
  static getItem(key) {
    if (this._isSSR()) { return }

    return localStorage.getItem(key)
  }

  static removeItem(key) {
    if (this._isSSR()) { return }

    return localStorage.removeItem(key)
  }

  static setItem(key, value) {
    if (this._isSSR()) { return }

    return localStorage.setItem(key, value)
  }

  static _isSSR() {
    return typeof localStorage === 'undefined'
  }
}
