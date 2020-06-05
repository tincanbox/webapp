const CONFIG = require('./workspace.config.js');

// Webpack
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./webpack.config.js');

// Gulp
const gulp = require('gulp');
const gulp_clean_css = require('gulp-clean-css');
const gulp_rename = require('gulp-rename');
const gulp_debug = require('gulp-debug');
const gulp_sourcemaps = require("gulp-sourcemaps");

// Others
const del = require('del');
const browsersync = require('browser-sync');

// SASS
const sass = require('gulp-sass');
sass.compiler = require('node-sass');


//-------------------------
// Base Tasks
//-------------------------
//

gulp.task('clean', gulp.series(
  () => {
    return del.sync([CONFIG.DIST_DIR]);
  })
);

gulp.task("server", (cb) => {
  browsersync({
    server: {
      baseDir: CONFIG.DIST_DIR
    }
  });
  return cb();
});

gulp.task('watch', gulp.series(
  (cb) => {
    // watching .ts, .js files
    gulp.watch([CONFIG.SRC_DIR + CONFIG.ASSET_GLOB_SCRIPT], gulp.series('bundle-webpack'));
    // watching .scss, .sass, .css files
    gulp.watch([CONFIG.SRC_DIR + CONFIG.ASSET_GLOB_STYLE], gulp.series('bundle-style'));
    return cb();
  })
);

//---------------------------------------------------

gulp.task('bundle-webpack', gulp.series(() => {
  return new Promise( (res, rej) => {
    webpack_stream(webpack_config, webpack)
      .on('end', res)
      .on('error', rej)
      .pipe(gulp.dest(CONFIG.DIST_DIR))
  });
}));

// Handling style-related files.
gulp.task('bundle-style', gulp.series(
  () => {
    // transcompiling and minifying a SCSS files.
    return gulp.src(CONFIG.SRC_DIR + CONFIG.ASSET_GLOB_STYLE)
      .pipe(gulp_debug())
      .pipe(gulp_sourcemaps.init())
      .pipe(sass())
      .pipe(gulp_rename({extname: '.min.css'}))
      .pipe(gulp_clean_css())
      .pipe(gulp_sourcemaps.write())
      .pipe(gulp.dest(CONFIG.DIST_DIR + "css"));
  })
);

//---------------------------------------------------

gulp.task('build', gulp.series(gulp.parallel('bundle-webpack', 'bundle-style')));
gulp.task('default', gulp.series('clean', 'build', 'watch'));