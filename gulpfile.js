(function() {
  'use strict';

  var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  open = require('gulp-open'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),

  _paths = ['server/**/*.js', 'app/scripts/**/*.js'],
  _csspath = 'app/styles/main.scss';


  //register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: 'server/app.js',
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('restart');
  });

  // Rerun the task when a file changes
  gulp.task('watch', function() {
    livereload.listen();
    gulp.src(_paths, {
      read: false
    })
    .pipe(watch({
      emit: 'all'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    watch(_paths, livereload.changed);
  });

  //lint js files
  gulp.task('lint', function() {
    gulp.src(_paths)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
  });

  //sass compile
  gulp.task('sass', function () {
    return gulp.src(_csspath)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./app/styles'));
  });

  //Open the app
  gulp.task('open', function(){
    gulp.src(__filename)
    .pipe(open({
      uri: 'http://localhost:9000'
    }));
  });

  //Clean persist folder
  gulp.task('cleanDB', function() {
    return gulp.src('./persist/*.json', {read: false})
    .pipe(clean());
  });

  //Reset persist folder
  gulp.task('resetDB', ['cleanDB'], shell.task("node server/scripts/initdb.js"));


  // The default task (called when you run `gulp` from cli)
  gulp.task('default', ['lint', 'sass', 'nodemon', 'open', 'watch']);

}());
