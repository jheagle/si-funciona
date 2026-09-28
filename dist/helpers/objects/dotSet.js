'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _isObject = _interopRequireDefault(require('./isObject'))
const _strAfter = _interopRequireDefault(require('../strings/strAfter'))
const _strBefore = _interopRequireDefault(require('../strings/strBefore'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Set a nested property value an object.
 * @param arrayObject - The array or object to set the property on
 * @param dotNotation - The path for the property
 * @param value - The default value to return if the property is not found
 * @returns The modified object
 */
const dotSet = (arrayObject, dotNotation, value = null) => {
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
  const next = arrayObject[key] ?? []
  // @ts-ignore
  arrayObject[key] = dotSet(next, (0, _strAfter.default)(dotNotation, '.'), value)
  return arrayObject
}
const _default = exports.default = dotSet
