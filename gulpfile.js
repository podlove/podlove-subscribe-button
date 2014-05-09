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
    .pipe(gulp.dest('./build/stylesheets'))
})

gulp.task('javascripts', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/javascripts'))
    .pipe(uglify())
    .pipe(concat('subscribe-it.min.js'))
    .pipe(gulp.dest('./build/javascripts'))
})

gulp.task('html', function() {
  gulp.src(['./button.html', './popup.html'])
    .pipe(gulp.dest('./build'))
})

gulp.task('default', ['stylesheets', 'javascripts', 'html'])

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./src/stylesheets/*.scss', ['stylesheets'])
  // Watch .js files
  gulp.watch('./src/javascripts/*.coffee', ['javascripts'])
  // Watch .html files
  gulp.watch(['./button.html', './popup.html'], ['html'])
})
