const babel = require('gulp-babel')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default

gulp.task('dist:functions', () => gulp.src('src/helpers/functions.js')
  .pipe(babel())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('dist/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('dist/helpers'))
)

gulp.task('dist:objects', () => gulp.src('src/helpers/objects.js')
  .pipe(babel())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('dist/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('dist/helpers'))
)

gulp.task('dist:arrays', () => gulp.src('src/helpers/arrays.js')
  .pipe(babel())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('dist/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('dist/helpers'))
)

gulp.task('dist:numbers', () => gulp.src('src/helpers/numbers.js')
  .pipe(babel())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('dist/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('dist/helpers'))
)

gulp.task('dist:helpers', gulp.parallel('dist:functions', 'dist:objects', 'dist:arrays', 'dist:numbers'))

gulp.task('dist:main', () => gulp.src('src/main.js')
  .pipe(babel())
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('dist'))
)

gulp.task('dist', gulp.parallel('dist:helpers', 'dist:main'))

// Cleaning
gulp.task('clean:dist', () => del('dist'))

gulp.task('clean', gulp.parallel('clean:dist'))

gulp.task('default', gulp.series('dist'))

gulp.task('build', gulp.series('clean', 'dist'))
