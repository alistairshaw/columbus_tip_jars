const path = require('path')
const withNextEnv = require('next-env')()

require('dotenv-load')()

module.exports = withNextEnv({
  webpack: (config) => {
    config.resolve.alias['src'] = path.join(__dirname, 'src')

    return config
  },
})
