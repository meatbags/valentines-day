var path = require('path');
var webpack = require('webpack');

// modules
var MiniCssExtract = require("mini-css-extract-plugin");
var UglifyJs = require("uglifyjs-webpack-plugin");
var TerserJs = require("terser-webpack-plugin");
var OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

// packages
var packages = {
  VDAY: {
    pathJS: './src/app.js',
    pathJSOut: 'build',
    nameJS: 'app.min',
    pathSCSS: './scss/style.js',
    pathCSSOut: 'build',
    nameCSS: 'style.min'
  },
};

module.exports = [];

Object.keys(packages).forEach(key => {
  const libraryName = key;
  const package = packages[key];

  // build JS
  if (package.pathJS) {
    module.exports.push({
      entry: {[package.nameJS]: package.pathJS},
      output: {
        library: libraryName,
        libraryTarget: 'var',
        path: path.resolve(__dirname, package.pathJSOut),
        filename: '[name].js'
      },
      module: {
        rules: [{
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {targets: { chrome: 53, ie: 11 }}
                ]
              ]
            }
          }
        }]
      },
      optimization: {
        minimizer: [
          new TerserJs({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
      resolve: {
        extensions: ['*', '.js']
      },
      stats: {colors: true, warnings: false}
    });
  }

  // build SCSS
  if (package.pathSCSS) {
    module.exports.push({
      entry: {'style.webpack': package.pathSCSS},
      output: {
        path: path.resolve(__dirname, package.pathCSSOut),
        filename: '[name].js'
      },
      module: {
        rules: [{
          test: /\.scss$/,
          use: [
            MiniCssExtract.loader, {
              loader: 'css-loader',
              options: {sourceMap: true, url: false} //importLoaders: 2,
            },{
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
        }]
      },
      optimization: {
        minimizer: [
          new UglifyJs({
            cache: true,
            parallel: true,
            sourceMap: true
          }),
          new OptimizeCSSAssets({})
        ]
      },
      plugins: [new MiniCssExtract({filename: './' + package.nameCSS + '.css', allChunks: true})]
    })
  }
});
