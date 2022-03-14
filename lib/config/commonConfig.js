module.exports = function () {
  const { resolve } = require('path'),
        { env: { MODE } } = require('process'),
        { DefinePlugin } = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        CopyWebpackPlugin = require('copy-webpack-plugin'),
        { project, selectedFrames } = require('../../config.json'),
        { cssRule, imgRule, jsxRule, sassRule, lessRule, tsxRule } = require('../addableConfig/rules.js');

  const config = {
    mode: MODE,
    entry: './index.js',
    output: {
      filename: './[name].[contenthash:8].bundle.js',
      path: resolve('./dist'),
      clean: true
    },
    resolve: {
      alias: { '@': resolve('./src') }
    },
    module: {
      rules: [cssRule, imgRule, jsxRule]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: project, 
        template: resolve(__dirname, '../template/index.model.html') 
      }),
      new DefinePlugin({
        'process.env.MODE': JSON.stringify(MODE)
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: 'public', 
          globOptions: {
            ignore: ['./index.html']
          }
        }]
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'async', 
        minChunks: 1, 
        minSize: 15000, 
        cacheGroups: { 
          defaultVendors: { 
            test: /[\\/]node_modules[\\/]/, 
            priority: -10, 
            name: 'vendors', 
            reuseExistingChunk: true 
          }
        }
      }
    }
  };

  for (const frame of selectedFrames) {
    frame === 'sass' && config.module.rules.push(sassRule);
    frame === 'less' && config.module.rules.push(lessRule);
    frame === 'typescript' && config.module.rules.push(tsxRule);
  }
  return config;
};


