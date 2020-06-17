const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias['src'] = path.join(__dirname, 'src')

    return config
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
  },
}
