'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/es.array.concat.js')

require('core-js/stable')

/**
 * Having an array and a potential new array element, check if the element is in the array, if not append to array.
 * @function
 * @memberOf module:arrayHelpers
 * @param {*} item - An potential array element, possibly a DomItem
 * @param {Array} array - An array where an element may be appended.
 * @returns {Array|Buffer|*|string}
 */
const addUniqueToArray = function addUniqueToArray (item, array) {
  return !array.includes(item) ? array.concat([item]) : array
}

const _default = addUniqueToArray
exports.default = _default
