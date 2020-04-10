module.exports = function (api) {
  api.cache.never()
  return {
    presets: ['next/babel'],
    plugins: [],
  }
}
