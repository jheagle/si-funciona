'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - Receives a function to be curried
 * @returns {Function|*}
 */
const curry = fn => function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key]
  }
  return args.length >= fn.length ? fn(...args) : function () {
    for (var _len2 = arguments.length, a = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      a[_key2] = arguments[_key2]
    }
    return curry(fn)(...[...args, ...a])
  }
}
var _default = exports.default = curry
