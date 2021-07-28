'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @function
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */
const setValue = function setValue (key, value, item) {
  item[key] = value
  return item
}

const _default = setValue
exports.default = _default
