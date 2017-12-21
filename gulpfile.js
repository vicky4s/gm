var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
// var babel = require("gulp-babel");
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
//var gulpBrowser = require("gulp-browser");

// var transforms = [{
//   transform: "babelify",
//   options: {
//     presets: ["es2015"]
//   }
// }];

// gulp.task('js', function() {
//   gulp.src('./src/page/**/*.js')
//     // .pipe(babel())
//     //.pipe(gulpBrowser.browserify(transforms))
//     //.pipe(uglify())
//     .pipe(gulp.dest('./dist/'))
// });

gulp.task('pug', function() {
  gulp.src('./src/page/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('css', function() {
  gulp.src('./src/page/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('connect', function() {
  connect.server({
    root: './dist/',
    port: 3000,
    host: "127.0.0.1",
    livereload: false
  });
});

gulp.task('watch', function() {
  // gulp.watch(['./src/page/**/*.js'], ['js']);
  gulp.watch(['./src/page/**/*.stylus'], ['css']);
  gulp.watch(['./src/page/**/*.pug'], ['pug', 'js']);
});

gulp.task('server', ['default', 'watch', 'connect']);
gulp.task('default', ['pug', 'css']);