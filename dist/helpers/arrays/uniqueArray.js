'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.index-of.js')

require('core-js/stable')

/**
 * Remove duplicate values from an array.
 * @function uniqueArray
 * @memberOf module:arrayHelpers
 * @param {Array} array - The array to make unique
 * @returns {Array}
 */
const uniqueArray = function uniqueArray (array) {
  return array.filter(function (item, index) {
    return array.indexOf(item) === index
  })
}

const _default = uniqueArray
exports.default = _default
