const { src, dest, parallel, watch, task, series } = require('gulp')
const pug = require('gulp-pug')
const scss = require('gulp-sass')
const bs = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
// const minifyCSS = require('gulp-csso')
// const concat = require('gulp-concat')

function html() {
  return src('pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('build'))
}

function css() {
  return src('scss/style.scss')
    .pipe(scss())
    // .pipe(minifyCSS())
    .pipe(dest('build/css'))
    .pipe(autoprefixer({
      cascade: false
    }))
}

// function js() {
//   return src('client/javascript/*.js', { sourcemaps: true })
//     .pipe(concat('app.min.js'))
//     .pipe(dest('build/js', { sourcemaps: true }))
// }

task('watcher', _=> {
  watch('pug/**/*.pug', series(html))
  watch('scss/**/*.scss', series(css))
})

task('serve', _ => {
  bs({
      server: {
          baseDir: 'build'
      },
      port: 1234,
      notify: true
  });
  bs.watch('build/**/*.*').on('change', bs.reload)
});

exports.default = parallel(
  series(html, css, 'watcher'),
  'serve'
  )
