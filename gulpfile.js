const babel = require('gulp-babel')
const concat = require('gulp-concat')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
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
      exports: () => 'functionHelpers'
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
          cjs: './main/arrays',
          param: 'arrayHelpers'
        },
        {
          cjs: './main/functions',
          param: 'functionHelpers'
        },
        {
          cjs: './main/numbers',
          param: 'numberHelpers'
        },
        {
          cjs: './main/objects',
          param: 'objectHelpers'
        }
      ]
    }
  },
  web: {
    arrays: {
      templateName: 'web',
      exports: () => 'arrayHelpers'
    },
    functions: {
      templateName: 'web',
      exports: () => 'functionHelpers'
    },
    numbers: {
      templateName: 'web',
      exports: () => 'numberHelpers'
    },
    objects: {
      templateName: 'web',
      exports: () => 'objectHelpers'
    },
    main: {
      templateName: 'web',
      exports: () => 'functionalHelpers'
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

gulp.task('browser:helpers', () => gulp.src('src/helpers/*.js')
  .pipe(gulpIf('arrays.js', umd(umdOptions.web.arrays)))
  .pipe(gulpIf('functions.js', umd(umdOptions.web.functions)))
  .pipe(gulpIf('numbers.js', umd(umdOptions.web.numbers)))
  .pipe(gulpIf('objects.js', umd(umdOptions.web.objects)))
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  // .pipe(uglify())
  .pipe(gulp.dest('browser/helpers'))
)

gulp.task('browser:main', () => gulp.src([
  'src/helpers/functions.js',
  'src/helpers/numbers.js',
  'src/helpers/arrays.js',
  'src/helpers/objects.js',
  'src/main.js'
])
  .pipe(concat('main.js'))
  .pipe(umd(umdOptions.web.main))
  .pipe(babel({
    presets: ['@babel/preset-env']
  }))
  // .pipe(uglify())
  .pipe(gulp.dest('browser'))
)

gulp.task('browser', gulp.parallel('browser:helpers', 'browser:main'))

// Cleaning
gulp.task('clean:dist', () => del('dist'))

gulp.task('clean:browser', () => del('browser'))

gulp.task('clean', gulp.parallel('clean:dist', 'clean:browser'))

gulp.task('default', gulp.series('distribute'))

gulp.task('build', gulp.series('clean', 'distribute', 'browser'))
