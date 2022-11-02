'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.map.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/es.regexp.exec.js')
require('core-js/modules/es.string.replace.js')
require('core-js/modules/es.regexp.constructor.js')
require('core-js/modules/es.regexp.sticky.js')
require('core-js/modules/es.regexp.to-string.js')
require('core-js/modules/es.string.match.js')
require('core-js/modules/es.array.concat.js')
require('core-js/stable')
var _isObject = _interopRequireDefault(require('./isObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * A string representing the full-path to a property in an object. Each depth of the path is separated by a period.
 * @example 'a.b.c'
 * @typedef {string} DotNotationString
 * @memberOf module:objectHelpers
 */

/**
 * An array or object where all properties have been flatted and keyed by a dot-notated string.
 * @typedef {Object.<DotNotationString, *>} DotNotatedObject
 * @memberOf module:objectHelpers
 */

/**
 * Convert an array of keys into a regex, return a function to test if incoming keys match.
 * @inner
 * @memberOf module:objectHelpers
 * @param {Array.<DotNotationString>} [retainObjects=[]] - An array of keys to retain as objects
 * @returns {Function} The dot-notated array
 */
var handleRetainObjects = function handleRetainObjects (retainObjects) {
  if (!retainObjects.length) {
    /**
     * Bypass the test function if there are no retainObjects.
     * @returns {false}
     */
    return function () {
      return false
    }
  }
  retainObjects = retainObjects.map(function (key) {
    return key.replace('\.', '\\.')
  })
  var retainRegex = new RegExp('('.concat(retainObjects.join('|'), ')$'))
  /**
   * Test if a key should be retained as an object.
   * @param {string} currentKey - The key to test
   * @param {*} value - The value of the key
   * @param {Object} results - The results object to add to
   * @returns {boolean}
   */
  return function (currentKey, value, results) {
    if (!currentKey.match(retainRegex)) {
      return false
    }
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
var performDotNotate = function performDotNotate (arrayObject, didRetain) {
  var prepend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ''
  var results = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}
  for (var key in arrayObject) {
    var value = arrayObject[key]
    var currentKey = ''.concat(prepend).concat(key)
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
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {Array.<DotNotationString>} [retainObjects=[]] - An array of keys to retain as objects
 * @returns {DotNotatedObject} The dot-notated object
 */
var dotNotate = function dotNotate (arrayObject) {
  var retainObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  return performDotNotate(arrayObject, handleRetainObjects(retainObjects))
}
var _default = dotNotate
exports.default = _default
