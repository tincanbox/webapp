const path = require('path');

const C = (() => {
  return require("./workspace.config.js");
})();

let exclude_reg_list = C.build.EXCLUDE.map((ex) => new RegExp(ex));

let conf = {

  mode: 'development',

  entry: (() => {
    let entries = {};
    for(let k in C.build.ENTRY){
      entries[k] = path.resolve(__dirname, C.build.ENTRY[k])
    }
    return entries;
  })(),

  output: {
    path: path.resolve(__dirname, C.build.DIST_DIR),
    filename: "[name].js"
  },

  resolve: {
    modules: Object.keys(C.build.ENTRY).map((k) => {
      let r = C.build.ENTRY[k];
      return path.resolve(__dirname, r);
    }),
    extensions: [
      '.ts', '.tsx', '.js'
    ]
  },

  plugins: [
    new (require('vue-loader/lib/plugin'))()
  ],

  module: {
    rules: [
      //{
      //  test: /\.s[ac]ss$/i,
      //  use: [
      //    // Creates `style` nodes from JS strings
      //    'style-loader',
      //    'css-loader',
      //    // Compiles Sass to CSS
      //    'sass-loader',
      //  ],
      //},
      {
        test: /\.vue$/,
        exclude: [/node_modules/].concat(exclude_reg_list),
        use: [
          { loader: 'vue-loader' },
          { loader: 'vue-style-loader' }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/].concat(exclude_reg_list),
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
        exclude: [/node_modules/].concat(exclude_reg_list),
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

module.exports = conf;