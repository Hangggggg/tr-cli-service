module.exports = function () {
  const WebpackDevServer = require('webpack-dev-server'),
        config = require('./mergeConfig.js')(),
        compiler = require('webpack')(config),
        devServerConfig = { ...config.devServer, open: true },
        server = new WebpackDevServer(devServerConfig, compiler);

  console.log('Starting server...');
  server.start(); // 返回 promise ，不进行处理
};