'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.string.replace.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Convert an array of keys into a regex, return a function to test if incoming keys match.
 * @inner
 * @memberOf module:objectHelpers
 * @param {Array.<DotNotationString>} [retainObjects=[]] - An array of keys to retain as objects
 * @returns {Function} The dot-notated array
 */
const handleRetainObjects = function () {
  let retainObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  if (!retainObjects.length) {
    /**
     * Bypass the test function if there are no retainObjects.
     * @returns {false}
     */
    return (currentKey, value, results) => false
  }
  retainObjects = retainObjects.map(key => key.replace('\.', '\\.'))
  const retainRegex = new RegExp('('.concat(retainObjects.join('|'), ')$'))
  /**
   * Test if a key should be retained as an object.
   * @param {string} currentKey - The key to test
   * @param {*} value - The value of the key
   * @param {Object} results - The results object to add to
   * @returns {boolean}
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
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {Function} didRetain - The test function to see if a key should be retained
 * @param {DotNotationString} [prepend=''] - The path for the property being processed
 * @param {DotNotatedObject} [results={}] - The final array to return
 * @returns {DotNotatedObject} The dot-notated object
 */
const performDotNotate = function (arrayObject, didRetain) {
  const prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''
  const results = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}
  // @ts-ignore
  for (const key in arrayObject) {
    // @ts-ignore
    const value = arrayObject[key]
    const currentKey = ''.concat(prepend).concat(key)
    if (didRetain(currentKey, value, results)) {
      continue
    }
    if ((0, _isObject.default)(value)) {
      performDotNotate(value, didRetain, ''.concat(currentKey, '.'), results)
      continue
    }
    results[currentKey] = value
  }
  return results
}
/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {Array.<DotNotationString>} [retainObjects=[]] - An array of keys to retain as objects
 * @returns {DotNotatedObject} The dot-notated object
 */
const dotNotate = function (arrayObject) {
  const retainObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  return performDotNotate(arrayObject, handleRetainObjects(retainObjects))
}
var _default = exports.default = dotNotate
