module.exports = function () {
  const WebpackDevServer = require('webpack-dev-server'),
        config = require('./mergeConfig.js')(),
        compiler = require('webpack')(config),
        devServerConfig = { ...config.devServer, open: true },
        server = new WebpackDevServer(devServerConfig, compiler);

  console.log('Starting server...');
  Promise.all(server.start(), WebpackDevServer.internalIP('v4')).then(result => {
    console.log('Success');
    console.log('Local IPv4 address:', result[1]);
  });
};