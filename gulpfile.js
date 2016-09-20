'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:8080",
    files: ["static/**/*.*"],
    browser: "google chrome",
    port: 7000,
  });
});
gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'build/dev-server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
