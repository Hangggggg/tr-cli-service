module.exports = function () {
  const config = require('./mergeConfig.js')(),
        compiler = require('webpack')(config); 

  compiler.run((error, stats) => { 
    error ? console.error(error) : console.log(stats.toString({ chunks: false,  colors: true })); 
    compiler.close(closeErr => closeErr && console.error(closeErr));
  });
};

