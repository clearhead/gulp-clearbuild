import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
const gulp = gulpHelp(_gulp);

import eslint from 'gulp-eslint';

gulp.task('lint', 'top level test', () => {
  return gulp.src(['./*.js', './src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});
