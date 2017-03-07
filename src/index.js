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
import finder from 'process-finder';

const paths = {
  src: {
    html: './src/**/*.html',
    scripts: './src/**/*.js',
    stylesheets: ['./src/**/*.css', './src/**/*.scss', './src/**/*.sass'],
  },
  html: './src/*.html',
  scripts: './src/*.js',
  stylesheets: ['./src/*.css', './src/*.scss', './src/*.sass'],
  dest: './build/',
};

export default function clearbuild(_gulp, { lintCss = false } = {}) {
  const gulp = gulpHelp(_gulp);
  const sequence = gulpSeq.use(gulp);

  gulp.task('default', 'Run the dev task.', ['dev']);

  // -- Live Development ----------
  gulp.task('dev', 'Build and preview your experiment.', () => {
    return sequence(
      ['lint:scripts', 'lint:stylesheets'],
      ['build:scripts', 'build:stylesheets']
    )();
  });

  gulp.task('npi', 'Start new NPI process.', () => {
    return sequence('npi:kill', 'npi:start')();
  });

  gulp.task('npi:start', 'Start NPI process.', shell.task('npi'));

  gulp.task('npi:kill', 'Kill NPI process.', () => {
    return finder.find(8000, function(err, pids) {
      pids.forEach((pid) => {
        shell.task(`kill -9 ${ pid }`)();
      });
    });
  });

  gulp.task('watch', 'Rebuild when experiment files change.', () => {
    gulp.watch(paths.src.html, ['build']);
    gulp.watch(paths.src.scripts, ['build']);
    gulp.watch(paths.src.stylesheets, ['build']);
  });

  // -- Build Experiment ----------
  gulp.task('build', 'Build experiment scripts and stylesheets.', () => {
    return sequence('lint', 'build:clean', ['build:scripts', 'build:stylesheets'])();
  });

  gulp.task('build:clean', 'Clean build.', (cb) => {
    return del(paths.dest, cb);
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
    const task = gulp.src(paths.stylesheets)
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(csslint(csslintConfig));
    if (lintCss) {
      task.pipe(csslint.reporter());
    }
  });
}
