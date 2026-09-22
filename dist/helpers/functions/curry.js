'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Return a curried version of the passed function.
 * The returned function expects the same number of arguments minus the ones provided.
 * fn is the name of the function being curried.
 * @memberOf module:functionHelpers
 * @param {Function} fn - Receives a function to be curried
 * @returns {Function|*}
 */
const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : (...a) => curry(fn)(...[...args, ...a])
const _default = exports.default = curry
