'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
var _strAfter = _interopRequireDefault(require('../strings/strAfter'))
var _strBefore = _interopRequireDefault(require('../strings/strBefore'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Set a nested property value an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @param {*} value - The default value to return if the property is not found
 * @returns {Object} The modified object
 */
const dotSet = function (arrayObject, dotNotation) {
  const value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null
  var _a
  let key = (0, _strBefore.default)(dotNotation, '.')
  const lastKey = !key
  if (lastKey) {
    key = dotNotation
  }
  if (key === '*') {
    for (const wildKey in arrayObject) {
      if (lastKey) {
        // @ts-ignore
        arrayObject[wildKey] = value
        continue
      }
      // @ts-ignore
      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue
      }
      // @ts-ignore
      dotSet(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'), value)
    }
    return arrayObject
  }
  if (lastKey) {
    // @ts-ignore
    arrayObject[dotNotation] = value
    return arrayObject
  }
  // @ts-ignore
  const next = (_a = arrayObject[key]) !== null && _a !== void 0 ? _a : []
  // @ts-ignore
  arrayObject[key] = dotSet(next, (0, _strAfter.default)(dotNotation, '.'), value)
  return arrayObject
}
var _default = exports.default = dotSet
