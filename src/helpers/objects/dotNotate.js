import 'core-js/stable'
import isObject from './isObject'

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
const handleRetainObjects = retainObjects => {
  if (!retainObjects.length) {
    /**
     * Bypass the test function if there are no retainObjects.
     * @returns {false}
     */
    return () => false
  }
  retainObjects = retainObjects.map(key => key.replace('\.', '\\.'))
  const retainRegex = new RegExp(`(${retainObjects.join('|')})$`)
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
const performDotNotate = (arrayObject, didRetain, prepend = '', results = {}) => {
  for (let key in arrayObject) {
    const value = arrayObject[key]
    const currentKey = `${prepend}${key}`
    if (didRetain(currentKey, value, results)) {
      continue
    }
    if (isObject(value)) {
      performDotNotate(value, didRetain, `${currentKey}.`, results)
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
const dotNotate = (arrayObject, retainObjects = []) => performDotNotate(arrayObject, handleRetainObjects(retainObjects))

export default dotNotate