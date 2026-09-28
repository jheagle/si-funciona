'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
const _isObject = _interopRequireDefault(require('./isObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Convert an array of keys into a regex, return a function to test if incoming keys match.
 * @inner
 * @param retainObjects - An array of keys to retain as objects
 * @returns The dot-notated array
 */
const handleRetainObjects = (retainObjects = []) => {
  if (!retainObjects.length) {
    /**
     * Bypass the test function if there are no retainObjects.
     */
    return (currentKey, value, results) => false
  }
  retainObjects = retainObjects.map(key => key.replace('\.', '\\.'))
  const retainRegex = new RegExp(`(${retainObjects.join('|')})$`)
  /**
   * Test if a key should be retained as an object.
   * @param currentKey - The key to test
   * @param value - The value of the key
   * @param results - The results object to add to
   */
  return (currentKey, value, results) => {
    if (!currentKey.match(retainRegex)) {
      return false
    }
    // @ts-ignore
    results[currentKey] = value
    return true
  }
}
/**
 * The underlying logic function for converting arrays to dot-notation.
 * @inner
 * @param arrayObject - The array or object to dot-notate
 * @param didRetain - The test function to see if a key should be retained
 * @param prepend - The path for the property being processed
 * @param results - The final array to return
 * @returns The dot-notated object
 */
const performDotNotate = (arrayObject, didRetain, prepend = '', results = {}) => {
  // @ts-ignore
  for (const key in arrayObject) {
    // @ts-ignore
    const value = arrayObject[key]
    const currentKey = `${prepend}${key}`
    if (didRetain(currentKey, value, results)) {
      continue
    }
    if ((0, _isObject.default)(value)) {
      performDotNotate(value, didRetain, `${currentKey}.`, results)
      continue
    }
    results[currentKey] = value
  }
  return results
}
/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @param arrayObject - The array or object to dot-notate
 * @param retainObjects - An array of keys to retain as objects
 * @returns The dot-notated object
 */
const dotNotate = (arrayObject, retainObjects = []) => performDotNotate(arrayObject, handleRetainObjects(retainObjects))
const _default = exports.default = dotNotate
