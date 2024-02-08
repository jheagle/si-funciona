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
 * Unset a nested property value an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @returns {Object} The modified object
 */
const dotUnset = (arrayObject, dotNotation) => {
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
        delete arrayObject[wildKey]
        continue
      }
      // @ts-ignore
      if (!(0, _isObject.default)(arrayObject[wildKey])) {
        continue
      }
      // @ts-ignore
      dotUnset(arrayObject[wildKey], (0, _strAfter.default)(dotNotation, '.'))
    }
    return arrayObject
  }
  if (lastKey) {
    // @ts-ignore
    delete arrayObject[dotNotation]
    return arrayObject
  }
  // @ts-ignore
  const next = (_a = arrayObject[key]) !== null && _a !== void 0 ? _a : []
  // @ts-ignore
  arrayObject[key] = dotUnset(next, (0, _strAfter.default)(dotNotation, '.'))
  return arrayObject
}
var _default = exports.default = dotUnset
