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
 * Get a nested property value from an object.
 * @param arrayObject - The array or object to get the property from
 * @param dotNotation - The path to the property
 * @param defaultValue - The default value to return if the property is not found
 * @returns The value of the property
 */
const dotGet = (arrayObject, dotNotation, defaultValue = null) => {
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
    return arrayObject[dotNotation] ?? defaultValue
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
const _default = exports.default = dotGet
