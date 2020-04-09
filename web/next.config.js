const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['src'] = path.join(__dirname, 'src')

    return config
  },
}
