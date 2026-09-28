'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.includes.js')
/**
 * Having an array and a potential new array element, check if the element is in the array, if not append to array.
 * @param item - An potential array element, possibly a DomItem
 * @param array - An array where an element may be appended.
 */
const addUniqueToArray = (item, array) => !array.includes(item) ? array.concat([item]) : array
const _default = exports.default = addUniqueToArray
