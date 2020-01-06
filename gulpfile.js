/* eslint-disable no-mixed-spaces-and-tabs */
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

require('dotenv').config();

gulp.task('sass', function () {
  return gulp.src('lib/scss/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./static/dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function () {
  browserSync.init({
    proxy: `localhost:${process.env.PORT}`
  });

  gulp.watch('lib/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('views/**/*.handlebars', browserSync.reload);
  gulp.watch('lib/js/**/*.js', browserSync.reload);
});
