'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/stable')
/**
 * Remove duplicate values from an array. uniqueArray
 * @memberOf module:arrayHelpers
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */
const uniqueArray = array => array.filter((item, index) => array.indexOf(item) === index)
var _default = exports.default = uniqueArray
