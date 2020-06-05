const CONFIG = require('./workspace.config.js');

module.exports = {

  mode: 'development',

  entry: {
    bootstrap: './src/bootstrap.ts'
  },

  output: {
    path: __dirname + '/' + CONFIG.DIST_DIR,
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: "ts-loader"
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  }

}