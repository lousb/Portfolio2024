const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
            new TerserPlugin(), // Minify JavaScript
            new CssMinimizerPlugin(), // Minify CSS
          ],
          splitChunks: {
            chunks: 'all',
          },
        };

        // Add ImageMinimizerPlugin for optimizing images
        webpackConfig.plugins.push(
          new ImageMinimizerPlugin({
            minimizerOptions: {
              // Image minimizer options
              plugins: [
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        removeViewBox: false,
                      },
                    ],
                  },
                ],
              ],
            },
          })
        );
      }

      return webpackConfig;
    },
  },
};
