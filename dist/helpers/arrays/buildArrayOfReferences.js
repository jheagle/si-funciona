'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Leverage buildArrayBase to generate an array filled with references to the provided item.
 * The length defines how long the array should be.
 * @function
 * @memberOf module:arrayHelpers
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @returns {Array.<*>}
 */
var buildArrayOfReferences = function buildArrayOfReferences (item, length) {
  var arr = []
  while (arr.length < length) {
    arr.push(item)
  }
  return arr
}
var _default = buildArrayOfReferences
exports.default = _default
