'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    gzip = require('gulp-gzip');

var dest = './dist';
var paths = {
  stylesheets: ['./src/stylesheets/*.scss'],
  main_javascript: ['./src/coffee/app.coffee'],
  javascripts: ['./src/coffee/*.coffee'],
  html: ['./src/html/button.html'],
  images: ['./src/images/**'],
  fonts: ['./src/fonts/**']
};

gulp.task('stylesheets', function() {
  return gulp.src(paths.stylesheets)
    .pipe(sourcemaps.init())
    .pipe(sass({style: 'compressed'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe(gzip())
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe(connect.reload())
})

gulp.task('javascripts', function(done) {
  gulp.src(paths.main_javascript, {read: false})
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./dist/javascripts'))
    .pipe(gzip())
    .pipe(gulp.dest('./dist/javascripts'))
    .pipe(connect.reload())

   done()
})

gulp.task('html', function(done) {
  gulp.src(paths.html)
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())

  done()
})

gulp.task('images', function(done) {
  gulp.src(paths.images)
    .pipe(gulp.dest('./dist/images'))
    .pipe(connect.reload())

  done()
})

gulp.task('fonts', function(done) {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(connect.reload())

  done()
})

gulp.task('default', gulp.series('stylesheets', 'javascripts', 'html', 'images', 'fonts'))

gulp.task('watch', function(done) {
  gulp.parallel(
    // Watch .scss files
    () => gulp.watch(paths.stylesheets, ['stylesheets']),
    // Watch .js files
    () => gulp.watch(paths.javascripts, ['javascripts']),
    // Watch .html files
    () => gulp.watch(paths.html, ['html']),
    // Watch images files
    () => gulp.watch(paths.images, ['images']),
    // Watch font files
    () => gulp.watch(paths.fonts, ['fonts']),
  );
  done()
})

gulp.task('connect', function(done) {
  connect.server({
    root:'./',
    livereload: true
  });

  done();
});

// Serve
gulp.task('serve', gulp.series('default', 'connect', 'watch'));
