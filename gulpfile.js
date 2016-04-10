(function() {
  'use strict';

  var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
//  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  open = require('gulp-open'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),


  paths = ['server/**/*.js', 'app/scripts/**/*.js'],
  csspath = 'app/styles/main.scss',
  mainpath = 'server/app.js';


  // register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: mainpath,
      env: {
        'NODE_ENV': 'development'
      },
      ignore: ['persist/*.*'],
      tasks: ['lint', 'sass']
    })
    .on('restart', function() {
      livereload.reload('app/index.html');
    });
  });

  // lint js files
  gulp.task('lint', function() {
    gulp.src(paths, {read: false})
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
  });

  // sass compile
  gulp.task('sass', function () {
    return gulp.src(csspath)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./app/styles'));
  });

  // Open the app
  gulp.task('open', function(){
    livereload.listen();
    gulp.src(__filename)
    .pipe(open({
      uri: 'http://localhost:9000',
      app: 'chrome'
    }));
  });

  // Clean persist folder
  gulp.task('cleanDB', function() {
    return gulp.src('./persist/*.json', {read: false})
    .pipe(clean());
  });

  // Reset persist folder
  gulp.task('resetDB', ['cleanDB'], shell.task("node server/scripts/initdb.js"));

  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['lint', 'sass', 'nodemon', 'open'], function() {
  //  gulp.src('./')
  });

}());
