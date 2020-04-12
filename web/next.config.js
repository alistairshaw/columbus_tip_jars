const path = require('path')

require('dotenv-load')()

module.exports = {
  webpack: (config) => {
    config.resolve.alias['src'] = path.join(__dirname, 'src')

    return config
  },
}
