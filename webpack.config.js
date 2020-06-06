const path = require('path');

const C = (() => {
  return require("./workspace.config.js");
})();

module.exports = {

  mode: 'development',

  entry: {
    bootstrap: path.resolve(__dirname, C.build.SRC_DIR + path.sep + 'bootstrap.ts')
    // Add more entries below.
  },

  output: {
    path: path.resolve(__dirname, C.build.DIST_DIR),
    filename: "[name].js"
  },

  resolve: {
    modules: [
      __dirname + path.sep + C.build.SRC_DIR
    ],
    extensions: [
      '.ts', '.tsx', '.js'
    ]
  },

  plugins: [
    new (require('vue-loader/lib/plugin'))()
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'vue-loader' },
          { loader: 'vue-style-loader' }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/env"]
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // If your project takes too long to build with type-checkings.
              //transpileOnly: true,
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/env"]
              ]
            }
          },
          {
            loader: 'eslint-loader',
          }
        ]
      },
    ]

  }
}