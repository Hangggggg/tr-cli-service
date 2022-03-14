const { env: { MODE } } = require('process');

function mergeConfig() {
  const commonConfig = require('./config/commonConfig.js')(),
        developmentConfig = require('./config/developmentConfig.js'),
        productionConfig = require('./config/productionConfig.js'),
        webpackConfig = getTrConfig()?.webpackConfig;
        
  if (MODE === 'development') {
    return mergeWithCustom(commonConfig, developmentConfig, webpackConfig);
  } else {
    return mergeWithCustom(commonConfig, productionConfig, webpackConfig);
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



module.exports = mergeConfig;
