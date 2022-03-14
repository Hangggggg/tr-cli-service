const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
      TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: { comments: false }
        },
        extractComments: false
      })
    ]
  }
};