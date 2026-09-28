'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
/**
 * Remove duplicate values from an array. uniqueArray
 * @param array - The array to make unique
 */
const uniqueArray = array => array.filter((item, index) => array.indexOf(item) === index)
const _default = exports.default = uniqueArray
