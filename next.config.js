 console.log('****',process.env.API_DEV);
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  env: {
    API_DEV: process.env.API_DEV,
    STRIPE_PUPLISHER_KEY: process.env.STRIPE_PUPLISHER_KEY,
  },
};
