"use strict";
/**
 * Version of the Webpack Config used for Development.
 *
 * This version will include SourceMaps, Uncompressed JS and HMR.
 */
const webpack = require("webpack");

module.exports = {
  mode: "none",

  output: {
    filename: "[name].min.js",
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread",
            ],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/(node_modules)/, /\.test\.(ts|tsx)$/],
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
};
