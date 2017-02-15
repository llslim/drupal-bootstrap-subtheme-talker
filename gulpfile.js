var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var fs   = require('fs');
//var browserSync = require('browserSyncser-sync').create();

/**
 * Included directories needed to compile theme's scss
 */
var sassPaths = [
];

function loadConfig() {
    if (fs.existsSync(__dirname + "/./drupalrefresh.js")) {
    config = {};
        config = require("./drupalrefresh.js");
  }

  return config;
}

loadConfig();

/**
 * Compiles theme's scss
 *
 * During development, disable thw render cache in settings.local.php.
 */
gulp.task('sass', function () {
    return gulp.src('./sass/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      noCache: true,
      outputStyle: "compressed",
      lineNumbers: false,
      sourceMap: true
    })).on('error', function(error) {
      $.util.log(error);
      this.emit('end');
    })
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe($.notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }));
});

/**
 * This task minifies javascript in the js/js-src folder and places them in the js directory.
 */
gulp.task('compress', function() {
  return gulp.src('./js/js-src/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'))
    .pipe(notify({
      title: "JS Minified",
      message: "All JS files in the theme have been minified.",
      onLast: true
    }));
});

/**
 * Defines a task that triggers a Drush cache clear (css-js).
 *
 * Works best when render cache is disabled in settings.local.php.
 *
 */
gulp.task('drush:cc', function () {
  if (!config.drush.enabled) {
    return;
  }

  return gulp.src('', {read: false})
    .pipe($.shell([
      config.drush.alias.css_js
    ]))
    .pipe($.notify({
      title: "Caches cleared",
      message: "Drupal CSS/JS caches cleared.",
      onLast: true
    }));
});

/**
 * Defines a task that triggers a Drush cache rebuild.
 */
gulp.task('drush:cr', function () {
  if (!config.drush.enabled) {
    return;
  }

  return gulp.src('', {read: false})
    .pipe($.shell([
      config.drush.alias.cr
    ]))
    .pipe($.notify({
      title: "Cache rebuilt",
      message: "Drupal cache rebuilt.",
      onLast: true
    }));
});

/**
 * Define a task to spawn Browser Sync.
 * Options are defaulted, but can be overridden within your config.js file.
 */
gulp.task('browser-sync', function() {
  browserSync.init({
    port: config.browserSync.port,
    host: config.browserSync.hostname,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges
  });
});

gulp.task('reload', function() {
  browserSync.reload();
});

/**
 * Defines the watcher task.
 */
gulp.task('watch', function() {
  // watch scss for changes and clear drupal theme cache on change
  gulp.watch(['sass/**/*.scss'], ['sass', 'drush:cc']);

  // watch js for changes and clear drupal theme cache on change
  // gulp.watch(['js-src/**/*.js'], ['compress', 'drush:cc']);

  // If user has specified an override, rebuild Drupal cache
  if (!config.twig.useCache) {
    gulp.watch(['templates/**/*.html.twig'], ['drush:cr']);
  }
});

gulp.task('default', ['watch']);
