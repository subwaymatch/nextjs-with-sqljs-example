module.exports = {
  webpack: (config, { isServer, webpack }) => {
    console.log(`Webpack version: ${webpack.version}`);

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
