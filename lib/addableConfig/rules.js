const { merge } = require('webpack-merge');

const cssRule = {
  test: /\.css$/,
  use: [
    { 
      loader: 'style-loader', 
      options: { injectType: 'singletonStyleTag' }  
    },
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    }
  ]
};

const sassRule = merge(cssRule, { test: /\.s[ac]ss$/, use: ['sass-loader'] });

const lessRule = merge(cssRule, { test: /\.less$/, use: ['less-loader'] });

const imgRule = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset',
  generator: { filename: 'images/[name].[contenthash:8][ext]' },
  parser: {
    dataUrlCondition: { maxSize: 100 * 1024 }
  }
}

const jsxRule = {
  test: /\.(jsx|js)$/,
  exclude: /node_modules/, 
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: "usage",
              corejs: 3 
            }
          ],
          '@hangteam/babel-preset-tr'
        ],   
      }
    }
  ]
}

const tsxRule = merge(jsxRule, { test: /\.(tsx|ts)$/, use: ['ts-loader'] });

module.exports = {
  cssRule,
  sassRule,
  lessRule,
  imgRule,
  jsxRule,
  tsxRule
};


