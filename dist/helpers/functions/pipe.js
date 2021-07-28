'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/stable')

/**
 * Take one or more function with a single parameter and return value.
 * Pass a parameter and the value will be transformed by each function then returned.
 * @function
 * @param {...Function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
const pipe = function pipe () {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key]
  }

  return function (x) {
    return fns.reduce(function (y, f) {
      return f(y)
    }, x)
  }
}

const _default = pipe
exports.default = _default
