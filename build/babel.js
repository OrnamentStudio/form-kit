const gulp = require('gulp');
const babel = require('gulp-babel');
const pump = require('pump');


module.exports = (options, done) => {
  const { src, dest } = options;

  pump(
    gulp.src(src),
    babel(),
    gulp.dest(dest),
    done,
  );
};
