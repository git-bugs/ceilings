let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  browsersync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  webpack = require("webpack-stream"),
  imagemin = require('gulp-imagemin');

const dist = "./dist/";

gulp.task('sass', () => {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream())
});

gulp.task("copy-html", () => {
  return gulp.src("./app/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task('image-compress', function () {
  return gulp.src('./app/assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(dist + '/images'))
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true
  });

  gulp.watch("./app/index.html", gulp.parallel("copy-html"));
  gulp.watch("./app/js/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./app/assets/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./app/assets/images/*", gulp.parallel("image-compress"));
});

gulp.task('style-lib', () => {
  return gulp.src([
    'libs/reset.css',
    'libs/slick.css'
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(dist + '/css'))
});

gulp.task('scripts-lib', () => {
  return gulp.src([
    'libs/jquery-slick.min.js',
    'libs/inputmask.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/scripts'))
});

gulp.task("build-prod-js", () => {
  return gulp.src("./app/js/main.js")
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'main.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist + '/scripts'));
});

gulp.task("build-js", () => {
  return gulp.src("./app/js/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist + '/scripts'))
    .on("end", browsersync.reload);
});

gulp.task('default', gulp.parallel('watch', 'style-lib','scripts-lib','image-compress'));

gulp.task("build", gulp.parallel("copy-html", "build-prod-js"));