import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
const gulp = gulpHelp(_gulp);

import clearbuild from '../src/index';
clearbuild.use(gulp);
