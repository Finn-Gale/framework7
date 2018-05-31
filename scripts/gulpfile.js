/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');

const buildKsCore = require('./build-ks-core.js');
const buildKsVue = require('./build-ks-vue.js');
const buildKsReact = require('./build-ks-react.js');

const buildCoreJs = require('./build-core-js.js');
const buildCoreLess = require('./build-core-less.js');
const buildCoreComponents = require('./build-core-components.js');

const buildPhenome = require('./build-phenome.js');
const buildVue = require('./build-vue');
const buildReact = require('./build-react');

const env = process.env.NODE_ENV || 'development';

// Tasks
gulp.task('ks-core', buildKsCore);
gulp.task('ks-vue', buildKsVue);
gulp.task('ks-react', buildKsReact);
gulp.task('core-js', buildCoreJs);
gulp.task('core-less', buildCoreLess);
gulp.task('core-components', buildCoreComponents);
gulp.task('phenome', buildPhenome);

gulp.task('build-core', ['core-js', 'core-less', 'core-components']);
gulp.task('build-react', buildReact);
gulp.task('build-vue', buildVue);

// Watchers
const watch = {
  all() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-react', 'ks-vue']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'build-react', 'build-vue', 'ks-react', 'ks-vue']);
    gulp.watch(['./react/kitchen-sink/src/**/*.js', './react/kitchen-sink/src/**/*.jsx'], ['ks-react']);
    gulp.watch(['./vue/kitchen-sink/src/**/*.js', './vue/kitchen-sink/src/**/*.jsx'], ['ks-vue']);
  },
  core() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
  },
  react() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-react']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'build-react', 'ks-react']);
    gulp.watch(['./react/kitchen-sink/src/**/*.js', './react/kitchen-sink/src/**/*.jsx'], ['ks-react']);
  },
  vue() {
    gulp.watch(['./src/**/**/*.js', '!./src/phenome/**/*.js'], ['core-js', 'ks-vue']);
    gulp.watch('./src/**/**/*.less', ['core-less']);
    gulp.watch(['./src/phenome/**/*.js', './src/phenome/**/*.jsx'], ['phenome', 'build-vue', 'ks-vue']);
    gulp.watch(['./vue/kitchen-sink/src/**/*.js', './vue/kitchen-sink/src/**/*.jsx'], ['ks-vue']);
  },
};

// Server
function server() {
  connect.server({
    root: ['./'],
    livereload: false,
    port: '3000',
  });
}
gulp.task('server', () => {
  if (env === 'development') watch.all();
  server();
  gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-core', () => {
  if (env === 'development') watch.core();
  server();
  gulp.src('./kitchen-sink/core/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/core/' }));
});
gulp.task('server-react', () => {
  if (env === 'development') watch.react();
  server();
  gulp.src('./kitchen-sink/react/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/react/' }));
});
gulp.task('server-vue', () => {
  if (env === 'development') watch.vue();
  server();
  gulp.src('./kitchen-sink/vue/index.html').pipe(gopen({ uri: 'http://localhost:3000/kitchen-sink/vue/' }));
});

