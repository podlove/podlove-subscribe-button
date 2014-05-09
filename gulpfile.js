var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch')

gulp.task('stylesheets', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(gulp.dest('./build/stylesheets'))
})

gulp.task('javascripts', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/javascripts'))
})

gulp.task('default', ['stylesheets', 'javascripts'])

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('./src/stylesheets/*.scss', ['stylesheets'])
  // Watch .js files
  gulp.watch('./src/javascripts/*.coffee', ['javascripts'])
})
