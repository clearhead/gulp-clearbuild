import gulpHelp from 'gulp-help';
import bundlify from './transforms/bundlify';
import gulpSeq from 'gulp-sequence';
import shell from 'gulp-shell';
import del from 'del';
import gulpSass from 'gulp-sass';
import eslint from 'gulp-eslint';
import eslintConfig from './config/eslintconfig';

const clearbuild = {};

const paths = {
  scripts: './src/*.js',
  stylesheets: ['./src/*.css', './src/*.scss', './src/*.sass'],
  dest: './build/',
  eslint: [],
};

clearbuild.use = (_gulp, { scripts, dest } = {}) => {
  const gulp = gulpHelp(_gulp);

  // -- Lint Experiment ----------
  gulp.task('lint', ['lint:scripts']);

  gulp.task('lint:scripts', 'Lint scripts with eslint.', () => {
    return gulp.src(['./**/*.js', '!./node_modules', '!./package.json'])
      .pipe(eslint(eslintConfig))
      .pipe(eslint.format());
  });

  // gulp.task('lint:stylesheets', () => {
  //   gulp.src('./src/styles/**/*.scss')
  //     .pipe(scsslint());
  // });

  // -- Build Experiment ----------
  gulp.task('build', 'Build experiment scripts and stylesheets.', [
    'build:scripts',
    'build:stylesheets',
  ]);

  gulp.task('build:scripts', 'Transpile and browserify scripts.', () => {
    return gulp.src(paths.scripts)
      .pipe(bundlify())
      .pipe(gulp.dest(paths.dest));
  });

  gulp.task('build:stylesheets', 'Compile stylesheets.', () => {
    return gulp.src(paths.stylesheets)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(gulp.dest(paths.dest));
  });
};

export default clearbuild;
