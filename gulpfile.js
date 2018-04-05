const gulp = require('gulp');
const del = require('del');
const sequence = require('run-sequence');
const watch = require('gulp-watch');

const babel = require('./build/babel');
const bundle = require('./build/bundle');


const pathNormalize = (path) => (path.replace(`${__dirname}/../`, ''));
const triggerTaskAction = (task) => (
  (event) => {
    console.info(`File ${pathNormalize(event.path)} was changed`);
    gulp.start(task);
  }
);

// Lib Tasks

gulp.task('lib:clean', () => del([`${__dirname}/lib`]));

gulp.task('lib:compile', (done) => {
  babel({
    src: `${__dirname}/src/**/*.es`,
    dest: `${__dirname}/lib`,
  }, done);
});

gulp.task('lib:watch', () => {
  const files = [`${__dirname}/src/**/*.es`];
  watch(files, triggerTaskAction('lib:compile'));
});

gulp.task('lib:build', (done) => {
  sequence(
    'lib:clean',
    'lib:compile',
    done,
  );
});

// Preview Tasks
gulp.task('preview:clean', () => del([`${__dirname}/preview/assets`]));

gulp.task('preview:bundle', (done) => {
  bundle({
    name: 'app.js',
    entries: `${__dirname}/preview/src/index.es`,
    cacheFile: `${__dirname}/bundle-cache.json`,
    dest: `${__dirname}/preview/assets`,
    debug: process.env.NODE_ENV !== 'production',
  }, done);
});

gulp.task('preview:watch', () => {
  const files = [`${__dirname}/preview/src/**/*.es`, `${__dirname}/lib/**/*.js`];
  watch(files, triggerTaskAction('preview:bundle'));
});

// Development

gulp.task('default', () => {
  sequence(
    ['lib:clean', 'preview:clean'],
    'lib:compile',
    'preview:bundle',
    ['lib:watch', 'preview:watch'],
  );
});
