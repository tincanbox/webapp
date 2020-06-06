// This is shared-configuration between Gulp and Webpack
//
// ==== A Notion for Windows ====
// DONT use \ backslash as a path-separator.
// the backslashes will be escaped with \\
// and glob-module wont be able to find path properly.

module.exports = {

  build: {

    // Adjust src/dist path accordingly.
    SRC_DIR: "src",
    DIST_DIR: "dist",

    ASSET_GLOB_SCRIPT: "**/*.{ts,js}",
    ASSET_GLOB_STYLE: "**/*.{scss,sass,css}"

  }

};