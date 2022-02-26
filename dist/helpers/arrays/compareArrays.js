'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

require('core-js/modules/es.regexp.exec.js')

require('core-js/modules/es.regexp.test.js')

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/esnext.async-iterator.reduce.js')

require('core-js/modules/esnext.iterator.constructor.js')

require('core-js/modules/esnext.iterator.reduce.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/esnext.async-iterator.map.js')

require('core-js/modules/esnext.iterator.map.js')

require('core-js/modules/es.array.concat.js')

require('core-js/modules/esnext.async-iterator.every.js')

require('core-js/modules/esnext.iterator.every.js')

require('core-js/stable')

var _isObject = _interopRequireDefault(require('../objects/isObject'))

var _mergeArrays = _interopRequireDefault(require('./mergeArrays'))

var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

function _typeof (obj) { '@babel/helpers - typeof'; return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }, _typeof(obj) }

/**
 * Store the comparison result for an element that may exist in either of compared arrays.
 * - value stores the element value from the arrays being compared
 * - results has the comparison results where first index (0) is result for first compared array
 *   and the second index (1) will be the result for the second compared array
 * @example
 * // example of input and resulting output
 *
 * const arr1 = ['match1', 'firstMismatch1', 'match2', 'firstMismatch2', 'badMatch1']
 * const arr2 = ['match1', 'match2', 'secondMismatch1', 'badMatch1', 'badMatch1']
 *
 * // Taking the first element in both, then the value: 'match1' exists in both arrays
 * // compareArrayResult will be { value: 'match1', result: [0, 0] }
 * // First index of 0 indicates this value in the first array exists in the second array
 * // Second index of 0 indicates this value in the second array exists in the first array
 *
 * // Taking the second element in the first array, then the value: 'firstMismatch1' exists in only the first array
 * // compareArrayResult will be { value: 'firstMismatch1', result: [1, -1] }
 * // First index of 1 indicates this value in the first array might need to be added to the second array
 * // Second index of -1 indicates this value only exists in the first array
 *
 * // Taking the third element in the second array, then the value: 'secondMismatch1' exists in only the second array
 * // compareArrayResult will be { value: 'secondMismatch1', result: [-1, 1] }
 * // First index of -1 indicates this value only exists in the second array
 * // Second index of 1 indicates this value in the second array might need to be added to the first array
 * @typedef {Object.<string, string|Array.<number>>} module:arrayHelpers~compareArrayResult
 * @memberOf module:arrayHelpers
 * @property {string} value - The element value being compared
 * @property {Array.<Array.<string|number>>} keys - Keys in arrays associated with this value
 * @property {Array.<number>} result - The results in the order of the compared arrays
 */

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
 * @function
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - The arrays to compare
 * @returns {Array.<module:arrayHelpers~compareArrayResult>}
 */
var compareArrays = function compareArrays () {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key]
  }

  return _mergeArrays.default.apply(void 0, arrays).reduce(function (results, attr) {
    var attrType = _typeof(attr)

    var useArray = Array.isArray(attr)
    var keys = arrays.map(function (array) {
      return array.reduce(function (results, current, key) {
        var currentType = _typeof(current)

        if (attrType !== currentType) {
          return results
        }

        if (!(0, _isObject.default)(attr)) {
          return current === attr ? [].concat(_toConsumableArray(results), [key]) : results
        }

        if (useArray !== Array.isArray(current)) {
          return results
        }

        var compareKeys = useArray ? compareArrays(attr, current) : compareArrays((0, _objectKeys.default)(attr), (0, _objectKeys.default)(current))
        return compareKeys.every(function (compare) {
          return compare.result.every(function (result) {
            return result === 0
          })
        }) ? [].concat(_toConsumableArray(results), [key]) : results
      }, [])
    })
    var arrayResults = keys.map(function (array) {
      return array.length ? 1 : -1
    })
    return [].concat(_toConsumableArray(results), [{
      value: attr,
      keys: keys,
      result: arrayResults.every(function (result) {
        return result === 1
      }) ? arrayResults.map(function (result) {
          return 0
        }) : arrayResults
    }])
  }, [])
}

var _default = compareArrays
exports.default = _default
