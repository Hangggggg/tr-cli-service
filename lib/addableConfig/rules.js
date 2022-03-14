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

const sassRule = { ...cssRule, test: /\.sass$/ };
sassRule.use.push('sass-loader');

const lessRule = { ...cssRule, test: /\.less$/ }; 
lessRule.use.push('less-loader');

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
  exclude: /node_moudules/, 
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

const tsxRule = { ... jsxRule, test: /\.(tsx|ts)$/ };
tsxRule.use.push('ts-loader');

module.exports = {
  cssRule,
  sassRule,
  lessRule,
  imgRule,
  jsxRule,
  tsxRule
};


