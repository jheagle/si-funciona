const babel = require('gulp-babel')
const concat = require('gulp-concat')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const umd = require('gulp-umd')

const umdOptions = {
  node: {
    arrays: {
      templateName: 'node',
      exports: () => 'arrayHelpers',
      dependencies: () => [
        {
          cjs: './functions',
          param: '{ curry }'
        },
        {
          cjs: './objects',
          param: '{ cloneObject }'
        }
      ]
    },
    functions: {
      templateName: 'node',
      exports: () => 'functionHelpers',
      dependencies: () => [
        {
          cjs: 'regenerator-runtime',
          param: 'regeneratorRuntime'
        }
      ]
    },
    numbers: {
      templateName: 'node',
      exports: () => 'numberHelpers'
    },
    objects: {
      templateName: 'node',
      exports: () => 'objectHelpers',
      dependencies: () => [
        {
          cjs: './functions',
          param: '{ curry, callWithParams }'
        }
      ]
    },
    main: {
      templateName: 'node',
      exports: () => 'functionalHelpers',
      dependencies: () => [
        {
          cjs: './helpers/arrays',
          param: 'arrayHelpers'
        },
        {
          cjs: './helpers/functions',
          param: 'functionHelpers'
        },
        {
          cjs: './helpers/numbers',
          param: 'numberHelpers'
        },
        {
          cjs: './helpers/objects',
          param: 'objectHelpers'
        },
        {
          cjs: 'regenerator-runtime',
          param: 'regeneratorRuntime'
        }
      ]
    }
  },
  web: {
    arrays: {
      templateName: 'web',
      exports: () => 'arrayHelpers',
      namespace: () => 'arrayHelpers'
    },
    functions: {
      templateName: 'web',
      exports: () => 'functionHelpers',
      namespace: () => 'functionHelpers'
    },
    numbers: {
      templateName: 'web',
      exports: () => 'numberHelpers',
      namespace: () => 'numberHelpers'
    },
    objects: {
      templateName: 'web',
      exports: () => 'objectHelpers',
      namespace: () => 'objectHelpers'
    },
    main: {
      templateName: 'web',
      exports: () => 'functionalHelpers',
      namespace: () => 'functionalHelpers'
    }
  }
}

gulp.task('distribute', () => gulp.src('src/**/*.js')
  .pipe(gulpIf('helpers/arrays.js', umd(umdOptions.node.arrays)))
  .pipe(gulpIf('helpers/functions.js', umd(umdOptions.node.functions)))
  .pipe(gulpIf('helpers/numbers.js', umd(umdOptions.node.numbers)))
  .pipe(gulpIf('helpers/objects.js', umd(umdOptions.node.objects)))
  .pipe(gulpIf('main.js', umd(umdOptions.node.main)))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(gulp.dest('dist'))
)

gulp.task('browser:functions', () => gulp.src('src/helpers/functions.js')
  .pipe(babel())
  .pipe(umd(umdOptions.web.functions))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('browser/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('browser/helpers'))
)

gulp.task('browser:objects', () => gulp.src([
  'src/helpers/functions.js',
  'src/helpers/objects.js'
])
  .pipe(concat('objects.js'))
  .pipe(babel())
  .pipe(umd(umdOptions.web.objects))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('browser/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('browser/helpers'))
)

gulp.task('browser:arrays', () => gulp.src([
  'src/helpers/functions.js',
  'src/helpers/objects.js',
  'src/helpers/arrays.js'
])
  .pipe(concat('arrays.js'))
  .pipe(babel())
  .pipe(umd(umdOptions.web.arrays))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('browser/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('browser/helpers'))
)

gulp.task('browser:numbers', () => gulp.src('src/helpers/numbers.js')
  .pipe(babel())
  .pipe(umd(umdOptions.web.numbers))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('browser/helpers'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('browser/helpers'))
)

gulp.task('browser:helpers', gulp.parallel('browser:functions', 'browser:objects', 'browser:arrays', 'browser:numbers'))

gulp.task('browser:main', () => gulp.src([
  'src/helpers/functions.js',
  'src/helpers/numbers.js',
  'src/helpers/arrays.js',
  'src/helpers/objects.js',
  'src/main.js'
])
  .pipe(concat('functional-helpers.js'))
  .pipe(babel())
  .pipe(umd(umdOptions.web.main))
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(gulp.dest('browser'))
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('browser'))
)

gulp.task('browser', gulp.parallel('browser:helpers', 'browser:main'))

// Cleaning
gulp.task('clean:dist', () => del('dist'))

gulp.task('clean:browser', () => del('browser'))

gulp.task('clean', gulp.parallel('clean:dist', 'clean:browser'))

gulp.task('default', gulp.series('distribute', 'browser'))

gulp.task('build', gulp.series('clean', 'distribute', 'browser'))
