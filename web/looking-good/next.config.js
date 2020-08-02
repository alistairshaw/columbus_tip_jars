const path = require('path')

module.exports = {
  webpack: (config) => {
    config.resolve.alias["src"] = path.join(__dirname, "src");

    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://columbus-tip-jar.herokuapp.com/",
  },
  target: "serverless",
};
