'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/stable')

const _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))

const _objectKeys = _interopRequireDefault(require('./objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Function to execute on each property in the object, taking four arguments
 * @callback module:objectHelpers~reduceCallback
 * @memberOf module:objectHelpers
 * @param {*} [accumulator={}] - The accumulator accumulates the callback's return values; it is the accumulated
 * value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
 * @param {*} [currentProperty={}] - The current property being processed in the object.
 * @param {string} [currentIndex=0] - The index of the current element being processed in the array. Starts at index
 * 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {Object|Array} [object={}] - The object reduce was called upon.
 * @returns {*}
 */

/**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {Object|Array}
 */
const reduceObject = function reduceObject (obj, fn) {
  const initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[(0, _objectKeys.default)(obj)[0]] || obj[0]
  return Array.isArray(obj)
    ? obj.reduce(fn, initialValue)
    : (0, _objectKeys.default)(obj, true).reduce(function (newObj, curr) {
        return (0, _callWithParams.default)(fn, [newObj, obj[curr], curr, obj], 2)
      }, initialValue)
}

const _default = reduceObject
exports.default = _default
