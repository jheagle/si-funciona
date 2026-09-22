'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
/**
 * Take one or more function with a single parameter and return value.
 * Pass a parameter and the value will be transformed by each function then returned.
 * @memberOf module:functionHelpers
 * @param {...Function} fns - Takes a series of functions having the same parameter
 * @returns {*}
 */
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const _default = exports.default = pipe
