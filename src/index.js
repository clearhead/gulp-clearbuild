import gulpHelp from 'gulp-help';
import bundlify from './transforms/bundlify';
import gulpSeq from 'gulp-sequence';
import shell from 'gulp-shell';
import del from 'del';
import gulpSass from 'gulp-sass';
import eslint from 'gulp-eslint';
import eslintConfig from './config/eslintconfig';
import csslint from 'gulp-csslint';
import csslintConfig from './config/csslintconfig';

const clearbuild = {};

const paths = {
  html: './src/*.html',
  scripts: './src/*.js',
  stylesheets: ['./src/*.css', './src/*.scss', './src/*.sass'],
  dest: './build/',
};

clearbuild.use = (_gulp, { scripts, dest } = {}) => {
  const gulp = gulpHelp(_gulp);

  gulp.task('default', 'Run the dev task.', ['dev']);

  // -- Live Development ----------
  gulp.task('dev',
    'Build, watch, and preview your experiment with node proxy injector.',
    ['build', 'npi', 'watch']
  );

  gulp.task('npi',
    'Start node proxy injector. NPI must be installed globally.',
    shell.task('npi')
  );

  gulp.task('watch', 'Rebuild when experiment files change.', () => {
    gulp.watch(paths.html, ['build']);
    gulp.watch(paths.scripts, ['lint:scripts', 'build']);
    gulp.watch(paths.stylesheets, ['lint:stylesheets', 'build']);
  });

  // -- Build Experiment ----------
  gulp.task('build', 'Build experiment scripts and stylesheets.', () => {
    return sequence('lint', 'build:clean', ['build:scripts', 'build:stylesheets']);
  });

  gulp.task('build:clean', 'Clean build.', () => {
    del(paths.dest);
  });

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

  // -- Lint Experiment ----------
  gulp.task('lint',
    'Lint scripts and stylesheets',
    ['lint:scripts', 'lint:stylesheets']
  );

  gulp.task('lint:scripts', 'Lint scripts.', () => {
    return gulp.src(paths.scripts)
      .pipe(eslint(eslintConfig))
      .pipe(eslint.format());
  });

  gulp.task('lint:stylesheets', 'Compile and lint stylesheets.', () => {
    gulp.src(paths.stylesheets)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(csslint(csslintConfig))
      .pipe(csslint.reporter());
  });
};

export default clearbuild;
