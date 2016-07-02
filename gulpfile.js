var gulp = require('gulp');
var webpack = require('webpack-stream');
var postcss = require('gulp-postcss');
var webserver = require('gulp-webserver');

//post plugins
var simpleVars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var imports = require('postcss-import');

gulp.task('scripts', function() {
  return gulp.src('./src/app/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'))
  ;
});

gulp.task('styles', function() {
  var processors = [
    imports,
    simpleVars,
    nested
  ];

  return gulp.src('./src/**/styles.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('build/'))
  ;

});

gulp.task('html', function() {
  return gulp.src(['./src/**/**.html', './src/**/**.ico'])
    .pipe(gulp.dest('build/'))
  ;
});

gulp.task('server', function() {
  return gulp.src('build')
    .pipe(webserver({
      livereload: true
    }))
  ;
});

gulp.task('default', ['scripts', 'html', 'styles', 'server'], function() {
  gulp.watch('./src/app/**/**.js', ['scripts']);
  gulp.watch('./src/**/**.html', ['html']);
  gulp.watch('./src/**/**.css', ['styles']);
});
