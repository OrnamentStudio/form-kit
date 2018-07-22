const gulp = require('gulp');
const browserify = require('browserify');
const { createWriteStream, mkdirSync, appendFileSync, existsSync } = require('fs');


const bundle = (done) => {
  const destDir = `${__dirname}/preview/assets`;
  const destFile = `${destDir}/app.js`;

  if (!existsSync(destDir)) mkdirSync(destDir);
  appendFileSync(destFile);

  const destStream = createWriteStream(destFile);

  const instance = browserify({
    entries: `${__dirname}/preview/lib/index.js`,
    debug: true,
    paths: [`${__dirname}/../node_modules`],
  });

  const stream = instance.bundle().pipe(destStream);
  stream.on('error', (err) => console.error(err.stack || err));
  stream.on('finish', done);
};

gulp.task('default', () => {
  const files = [
    `${__dirname}/preview/lib/**/*.js`,
    `${__dirname}/lib/**/*.js`,
  ];

  gulp.watch(files, bundle);
});
