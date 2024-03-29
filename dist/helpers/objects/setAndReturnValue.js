'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
/**
 * Set a value on an item, then return the value
 * @memberOf module:objectHelpers
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */
const setAndReturnValue = (item, key, value) => {
  item[key] = value
  return value
}
var _default = exports.default = setAndReturnValue
