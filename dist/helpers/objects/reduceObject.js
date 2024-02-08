'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.async-iterator.reduce.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))
var _objectKeys = _interopRequireDefault(require('./objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|Function|reduceCallback} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {*}
 */
const reduceObject = function (obj, fn) {
  const initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : obj[(0, _objectKeys.default)(obj)[0]] || obj[0]
  return Array.isArray(obj) ? obj.reduce(fn, initialValue) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _callWithParams.default)(fn, [newObj, obj[curr], curr, obj], 2), initialValue)
}
var _default = exports.default = reduceObject
