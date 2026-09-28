'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Set a value on an item, then return the value
 * @param item - An object or array to be updated
 * @param key - The key on the item which will have its value set
 * @param value - Any value to be applied to the key
 */
const setAndReturnValue = (item, key, value) => {
  item[key] = value
  return value
}
const _default = exports.default = setAndReturnValue
