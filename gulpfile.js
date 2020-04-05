/* jshint node:true */
'use strict';

var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  livereload = require('gulp-livereload'),
  fileinclude = require('gulp-file-include'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  iconfont = require('gulp-iconfont'),
  watch = require('gulp-watch');

// Definitions
var source = {
  js: [
    'assets/js/jquery.min.js',
    'assets/js/typed.js',
    'assets/js/slick.js',
    'assets/js/script.js',
  ],
};

// Tasks
// Webserver
gulp.task('webserver', function () {
  gulp.src('./').pipe(
    webserver({
      open: '/build',
      livereload: true,
      directoryListing: true,
      fallback: 'index.html',
    }),
  );
});

// File include
gulp.task('fileinclude', function () {
  gulp
    .src(['html-dev/*.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: 'html-dev/',
      }),
    )
    .pipe(gulp.dest('build'))
    .pipe(livereload({ start: true }));
});

// Styles
gulp.task('sass', function () {
  gulp
    .src('assets/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('build/assets/css'))
    .pipe(livereload({ start: true }));
});

// Scripts
gulp.task('scripts', function () {
  gulp
    .src(source.js)
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'))
    .pipe(livereload({ start: true }));
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src('assets/fonts/*').pipe(gulp.dest('build/assets/fonts'));
});

// Iconfont
gulp.task('Iconfont', function () {
  return gulp
    .src(['assets/img/icons/*.svg'])
    .pipe(
      iconfont({
        fontName: 'iconFont',
        prependUnicode: true,
        formats: ['ttf', 'eot', 'woff', 'svg'],
        normalize: true,
        fontWeight: '300',
        fontHeight: 100,
        fixedWidth: false,
        centerHorizontally: false,
      }),
    )
    .pipe(gulp.dest('build/assets/fonts/'));
});

// images
gulp.task('images', function () {
  return gulp.src('assets/img/**/*').pipe(gulp.dest('build/assets/img/'));
});

// Watch
gulp.task('watch', function () {
  gulp.watch(['assets/scss/*.scss'], ['sass']);
  gulp.watch(['assets/js/*.js'], ['scripts']);
  gulp.watch(['assets/img/icons/*.svg'], ['Iconfont']);
  gulp.watch(['html-dev/**/*.html'], ['fileinclude']);
  gulp.watch(['assets/fonts/*.*'], ['fonts']);
  gulp.watch(['assets/img/**/*'], ['images']);
});

// Default task
gulp.task('default', [
  'sass',
  'scripts',
  'Iconfont',
  'fonts',
  'fileinclude',
  'images',
  'webserver',
  'watch',
]);

/*
.gitignore

.idea
node_modules/
.DS_Store
.ftpconfig
build/
.vscode/
*/
