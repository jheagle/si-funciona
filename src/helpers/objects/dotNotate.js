import 'core-js/stable'
import isObject from './isObject'
import strBeforeLast from '../strings/strBeforeLast'

/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {string} [prepend=''] - The path for the property being processed
 * @param {Object} [results={}] - The final array to return
 * @returns {Object} The dot-notated array
 */
const dotNotate = (arrayObject, prepend = '', results = {}) => {
  for (let key in arrayObject) {
    const value = arrayObject[key]
    if (isObject(value)) {
      const nestedKey = `${prepend}${key}`
      let allMatches = []
      const prepends = nestedKey.split('.')
      if (prepends.length > 1) {
        const lastTwoPrepends = prepends.slice(prepends.length - 2).join('.')
        const lastPrependsRegex = new RegExp(lastTwoPrepends.replace('\.', '\\.'), 'g')
        allMatches = (nestedKey.match(lastPrependsRegex) || [])
      }
      if (allMatches.length > 1) {
        return results
      }
      dotNotate(value, `${nestedKey}.`, results)
      continue
    }
    results[prepend + key] = value
  }

  return results
}

export default dotNotate