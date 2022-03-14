#!/usr/bin/env node
const process = require('process');

if (!require('../config.json').initialization) {
  throw Error('\'config.json\' in tr-cli-service is not initialized');
}

switch (process.argv[2]) {
  case 'serve': 
    process.env.MODE = 'development';
    return require('../lib/serve.js')();
  case 'build': 
    process.env.MODE = 'production';
    return require('../lib/build.js')();
  default:
    throw Error('Parameter error in tr-cli-service'); 
}

