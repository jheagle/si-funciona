'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _isObject = _interopRequireDefault(require('../objects/isObject'))
var _mergeArrays = _interopRequireDefault(require('./mergeArrays'))
var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Compare two Arrays and return the Object where the value for each property is as follows:
 * -1 to indicate val1 is less than val2
 * 0 to indicate both values are the equal
 * 1 to indicate val1 is greater than val2
 * The returned Object uses the element values as the property names
 * This functions works by first creating a concatenated array of all unique values. Then for each unique values,
 * convert to a string and use it as a new property name. Array filter each array checking if it has the unique value.
 * Use the lengths of these filtered arrays to compare. So if the first array has the value and the second one doesn't
 * the first length will be one or more and the second will be zero, if the both have the value then both will be one
 * or more.
 * @example
 * // example of input and resulting output
 * compareArrays(
 *   ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1'],
 *   ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 * )
 * // unique array
 * ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1', 'secondMismatch1']
 * // result object
 * [
 *   {
 *     value: 'match1',
 *     keys: [[0], [0]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch1',
 *     keys: [[1], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'match2',
 *     keys: [[2], [1]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'firstMismatch2',
 *     keys: [[3], []],
 *     result: [1, -1]
 *   },
 *   {
 *     value: 'badMatch1',
 *     keys: [[4], [3, 4]],
 *     result: [0, 0]
 *   },
 *   {
 *     value: 'secondMismatch1',
 *     keys: [[], [2]],
 *     result: [-1, 1]
 *   }
 * ]
 *
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - The arrays to compare
 * @returns {Array.<module:arrayHelpers~compareArrayResult>}
 */
const compareArrays = function () {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key]
  }
  return (0, _mergeArrays.default)(...arrays).reduce((results, attr) => {
    const attrType = typeof attr
    const useArray = Array.isArray(attr)
    const keys = arrays.map(array => array.reduce((results, current, key) => {
      const currentType = typeof current
      if (attrType !== currentType) {
        return results
      }
      if (!(0, _isObject.default)(attr)) {
        return current === attr ? [...results, key] : results
      }
      if (useArray !== Array.isArray(current)) {
        return results
      }
      const compareKeys = useArray ? compareArrays(attr, current) : compareArrays((0, _objectKeys.default)(attr), (0, _objectKeys.default)(current))
      return compareKeys.every(compare => compare.result.every(result => result === 0)) ? [...results, key] : results
    }, []))
    const arrayResults = keys.map(array => array.length ? 1 : -1)
    return [...results, {
      value: attr,
      keys: keys,
      result: arrayResults.every(result => result === 1) ? arrayResults.map(result => 0) : arrayResults
    }]
  }, [])
}
var _default = exports.default = compareArrays
