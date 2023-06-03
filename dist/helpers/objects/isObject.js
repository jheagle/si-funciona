'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Check if the provided thing is an object / array.
 * @function
 * @memberOf module:objectHelpers
 * @param {*} object
 * @returns {boolean}
 */
const isObject = object => typeof object === 'object' && object !== null
var _default = isObject
exports.default = _default
