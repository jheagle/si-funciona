const babel = require('gulp-babel')
const browserify = require('browserify')
const del = require('del')
const { dest, parallel, series, src, watch } = require('gulp')
const jsdoc2md = require('jsdoc-to-markdown')
const rename = require('gulp-rename')
const source = require('vinyl-source-stream')
const standard = require('gulp-standard')
const uglify = require('gulp-uglify-es').default

const dist = () => src('src/**/!(*.test).js')
  .pipe(babel())
  .pipe(standard({ fix: true }))
  .pipe(standard.reporter('default', {
    fix: true,
    quiet: true
  }))
  .pipe(dest('dist'))

const bundle = () => browserify('dist/main.js')
  .bundle()
  .pipe(source('functionalHelpers.js'))
  .pipe(dest('browser'))

exports.default = series(dist, bundle)

exports.watch = () => watch('src/**/*.js', { ignoreInitial: false, usePolling: true }, series(dist, bundle))

const clean = () => del(['dist', 'browser'])

const distLint = () => src('dist/**/*.js')
  .pipe(standard({ fix: true }))
  .pipe(standard.reporter('default', {
    fix: true,
    quiet: true
  }))
  .pipe(dest('dist'))

const distMinify = () => src('dist/**/*.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest('dist'))

const bundleLint = () => src('browser/functionalHelpers.js')
  .pipe(standard({ fix: true }))
  .pipe(standard.reporter('default', {
    fix: true,
    quiet: true
  }))
  .pipe(dest('browser'))

const bundleMinify = () => src('browser/functionalHelpers.js')
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest('browser'))

exports.readme = () => src(['MAIN.md', 'src/**/!(*.test).js'])
  .pipe(jsdoc2md.renderSync)
  .pipe(dest('README.md'))

exports.build = series(clean, dist, parallel(distLint, distMinify), bundle, parallel(bundleLint, bundleMinify))
