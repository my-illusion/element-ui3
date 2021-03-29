'use strict'
const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')

function compile() {
    return src(['./src/components/**/*.scss', './src/theme-chalk/index.scss'])
      .pipe(sass.sync())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['ie > 9', 'last 2 versions'],
          cascade: false
        })
      )
      .pipe(cssmin())
    //   .pipe(rename(function(path) {
    //       console.log(path)
    //       path.dirname = './lib'
    //   }))
      .pipe(dest('./lib'))
}

exports.build = series(compile)