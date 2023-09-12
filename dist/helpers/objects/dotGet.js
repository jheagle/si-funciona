'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
var _strAfter = _interopRequireDefault(require('../strings/strAfter'))
var _strBefore = _interopRequireDefault(require('../strings/strBefore'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Get a nested property value from an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to get the property from
 * @param {string} dotNotation - The path to the property
 * @param {string|null} [defaultValue=null] - The default value to return if the property is not found
 * @returns {*} The value of the property
 */
const dotGet = function (arrayObject, dotNotation) {
  const defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null
  var _a
  let key = (0, _strBefore.default)(dotNotation, '.')
  const lastKey = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    const result = []
    for (const wildKey in arrayObject) {
      // @ts-ignore
      const wildValue = arrayObject[wildKey]
      if (lastKey) {
        // @ts-ignore
        result[wildKey] = wildValue
        continue
      }
      if (!(0, _isObject.default)(wildValue)) {
        continue
      }
      // @ts-ignore
      result[wildKey] = dotGet(wildValue, (0, _strAfter.default)(dotNotation, '.'), defaultValue)
    }
    return result
  }
  if (lastKey) {
    // @ts-ignore
    return (_a = arrayObject[dotNotation]) !== null && _a !== void 0 ? _a : defaultValue
  }
  // @ts-ignore
  if (typeof arrayObject[key] === 'undefined') {
    return defaultValue
  }
  // @ts-ignore
  const next = arrayObject[key]
  if (!(0, _isObject.default)(next)) {
    return defaultValue
  }
  return dotGet(next, (0, _strAfter.default)(dotNotation, '.'), defaultValue)
}
var _default = dotGet
exports.default = _default
