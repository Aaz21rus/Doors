const { src, dest, parallel, watch, task, series } = require('gulp')
const pug = require('gulp-pug')
const scss = require('gulp-sass')
const bs = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
// const minifyCSS = require('gulp-csso')
// const concat = require('gulp-concat')

function html() {
  return src('pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('build'))
}

function css() {
  return src('scss/style.scss')
    .pipe(scss())
    // .pipe(minifyCSS())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('build/css'))
}

// function js() {
//   return src('client/javascript/*.js', { sourcemaps: true })
//     .pipe(concat('app.min.js'))
//     .pipe(dest('build/js', { sourcemaps: true }))
// }

function copyImg() {
  return src('img/**/*.{jpg,jpeg,gif,png,svg}').pipe(dest('build/img'))
}

function copyFonts() {
  return src('fonts/*.*').pipe(dest('build/fonts'))
}

task('watcher', _=> {
  watch('pug/**/*.pug', series(html))
  watch('scss/**/*.scss', series(css))
  watch('img/**/*.{jpg,jpeg,gif,png,svg}', series(copyImg))
  watch('fonts/*.*', series(copyFonts))
})

task('serve', _ => {
  bs({
      server: {
          baseDir: 'build'
      },
      port: 1234,
      notify: true,
      open: false
  })

  bs.watch('build/**/*.*').on('change', bs.reload)
})

exports.default = parallel(
  series(html, css, copyImg, copyFonts, 'watcher'),
  'serve'
)
