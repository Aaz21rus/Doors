const { src, dest, parallel, watch, task, series } = require('gulp')
const path = require('path')
const pug = require('gulp-pug')
const scss = require('gulp-sass')
const gulplog = require('gulplog')
const notifier = require('node-notifier')
const bs = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
// const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')
const webpack = require('webpack')

function html() {
  return src('pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Pug Error',
          message: err.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('build'))
}

function css() {
  return src('scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'SCSS Error',
          message: err.message
        }
      })
    }))
    .pipe(scss())
    // .pipe(minifyCSS())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('build/css'))
}

function js() {
  return src('js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js'))
}

task('webpack', function(callback) {

  let options = {
    entry: {
      scripts: './js/index',
    },
    output: {
      path: __dirname + '/build/js',
      filename: '[name].js'
    },
    watch: true,
    mode: 'development',
    devtool: 'cheap-module-inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.join(__dirname, 'js'),
          loader: 'babel-loader?presets[]=@babel/env'
        }
      ]
    }
  }

  webpack(options, function(err, stats) {
    if (!err) { // no hard error
      // try to get a soft error from stats
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      })

      gulplog.error(err)
    } else {
      gulplog.info(stats.toString({
        colors: true
      }))
    }

    // task never errs in watch mode, it waits and recompiles
    if (!options.watch && err) {
      callback(err)
    } else {
      callback()
    }
  })
})

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
  // watch('js/**/*.js', series(js))
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
  series(html, css, 'webpack', copyImg, copyFonts, 'watcher'),
  'serve'
)
