const { env: { MODE } } = require('process');

function mergeConfig() {
  const commonConfig = require('./config/commonConfig.js')(),
        developmentConfig = require('./config/developmentConfig.js'),
        productionConfig = require('./config/productionConfig.js'),
        webpackConfig = getTrConfig()?.webpackConfig;

  if (MODE === 'development') {
    return webpackConfig ? mergeWithCustom(commonConfig, developmentConfig, webpackConfig) : mergeWithCustom(commonConfig, developmentConfig);
  } else {
    return webpackConfig ? mergeWithCustom(commonConfig, productionConfig, webpackConfig) : mergeWithCustom(commonConfig, productionConfig);
  }
}

function getTrConfig() {
  return require('fs').existsSync('tr.config.js') ? require(require('path').resolve('tr.config.js'))({ mode: MODE }) : null;
}

function mergeWithCustom() {
  return require('webpack-merge').mergeWithCustomize({
    customizeObject(a, b, key) {
      if (key === 'splitChunks') {
        return b;
      }
    }
  })(...arguments);
}

console.log(mergeWithCustom({n:1},{m:2},{}));

module.exports = mergeConfig;
