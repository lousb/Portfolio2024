const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Check if we're in production mode
      if (process.env.NODE_ENV === 'production') {
        // Modify the optimization options for production build
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          minimize: true,
          minimizer: [
            // Use TerserPlugin for JavaScript minification
            new TerserPlugin(),
            // Use CssMinimizerPlugin for CSS minification
            new CssMinimizerPlugin(),
          ],
          splitChunks: {
            chunks: 'all',
          },
        };
      }

      return webpackConfig;
    },
  },
};
