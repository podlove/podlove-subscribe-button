var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch')
    uglify = require('gulp-uglify')
    concat = require('gulp-concat')

gulp.task('stylesheets', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(gulp.dest('./build'))
})

gulp.task('javascripts', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build'))
    .pipe(uglify())
    .pipe(concat('subscribe-it.min.js'))
    .pipe(gulp.dest('./build'))
})

gulp.task('html', function() {
  gulp.src(['./src/button.html', './src/popup.html'])
    .pipe(gulp.dest('./build'))
})

gulp.task('images', function() {
  gulp.src(['./src/images/*'])
    .pipe(gulp.dest('./build/images'))
})

gulp.task('default', ['stylesheets', 'javascripts', 'html', 'images'])

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./src/stylesheets/*.scss', ['stylesheets'])
  // Watch .js files
  gulp.watch('./src/javascripts/*.coffee', ['javascripts'])
  // Watch .html files
  gulp.watch(['./src/button.html', './src/popup.html'], ['html'])
  // Watch images files
  gulp.watch(['./src/images/*'], ['images'])
})
