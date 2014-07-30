var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

var dest = './build';

gulp.task('stylesheets', function() {
  return gulp.src('./src/stylesheets/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload())
})

gulp.task('javascripts', function() {
  gulp.src('./src/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(dest))
    .pipe(uglify())
    .pipe(concat('subscribe-it.min.js'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload())
})

gulp.task('html', function() {
  gulp.src(['./src/button.html', './src/popup.html'])
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('images', function() {
  gulp.src(['./src/images/**'])
    .pipe(gulp.dest('./build/images'))
    .pipe(connect.reload())
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

gulp.task('connect', function() {
  connect.server({
    root:'./',
    livereload: true
  });
});

// Serve
gulp.task('serve', ['default', 'connect', 'watch']);
