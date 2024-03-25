const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        // Modify the optimization options for production build
        webpackConfig.optimization.minimizer = [
          // Use TerserPlugin for JavaScript minification
          new TerserPlugin({
            terserOptions: {
              // Additional options if needed
            },
          }),
          // Use CssMinimizerPlugin for CSS minification
          new CssMinimizerPlugin(),
        ];
      }
      
      return webpackConfig;
    },
  },
};
