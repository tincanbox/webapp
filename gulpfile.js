const CONFIG = require('./workspace.config.js');
const path = require('path');

// Webpack
const webpack_stream = require('webpack-stream');
const webpack_config_factory = require('./webpack.config.factory.js');

// Gulp
const gulp = require('gulp');
const gulp_clean_css = require('gulp-clean-css');
const gulp_sass = require('gulp-sass');
const gulp_rename = require('gulp-rename');
const gulp_debug = require('gulp-debug');
const gulp_sourcemaps = require("gulp-sourcemaps");

gulp_sass.compiler = require('node-sass');

// Others
const del = require('del');
const browsersync = require('browser-sync');

// Helper
function bind_config(type, ...cbs){
  return gulp[type].apply(gulp, cbs.map((f) => {
    return () => {
      return new Promise(async (res, rej) => {
        try{
          let r = await f.apply(gulp, [CONFIG, res, rej]);
          return res(r);
        }catch(e){
          rej(e);
        }
      });
    };
  }));
}

// fetch command line arguments
const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);
console.log("CLI arg", arg);

//-------------------------
// Base Tasks
//-------------------------

gulp.task('clean', bind_config("series",
  (C) => {
    return del.sync([C.build.DIST_DIR]);
  })
);

gulp.task("server", bind_config("series",
  (C) => {
    browsersync({
      server: {
        baseDir: C.build.DIST_DIR
      }
    });
  })
);

gulp.task('watch', bind_config("series",
  (C) => {
    gulp.watch([C.build.SRC_DIR + path.sep + C.build.ASSET_GLOB_SCRIPT], gulp.series('bundle-webpack'));
    // watching .scss, .sass, .css files
    gulp.watch([C.build.SRC_DIR + path.sep + C.build.ASSET_GLOB_STYLE], gulp.series('bundle-style'));
  })
);

//-------------------------
// Bundling Tasks
//-------------------------

gulp.task('bundle-webpack', bind_config("parallel",
  (C, res, rej) => {
    let wcf = webpack_config_factory(arg);
    return gulp.src(C.build.SRC_DIR)
      .pipe(webpack_stream(wcf, null, (err, stats) => { if(err) console.error(err); }))
      .pipe(gulp.dest(C.build.DIST_DIR))
  })
);

// Handling style-related files.
gulp.task('bundle-style', bind_config("parallel",
  (C, res, rej) => {
    // transcompiling and minifying a SCSS files.
    return gulp.src(C.build.SRC_DIR + "/" + C.build.ASSET_GLOB_STYLE)
      .pipe(gulp_debug())
      .pipe(gulp_sourcemaps.init())
      .pipe(gulp_sass())
      .pipe(gulp_rename({extname: '.min.css'}))
      .pipe(gulp_clean_css())
      .pipe(gulp_sourcemaps.write())
      .pipe(gulp.dest(C.build.DIST_DIR));
  })
);

//-------------------------
// Group up tasks.
//-------------------------

gulp.task('build', gulp.parallel('bundle-webpack', 'bundle-style'));
gulp.task('pack', gulp.series('clean', 'build'));
gulp.task('default', gulp.series('pack', 'watch'));