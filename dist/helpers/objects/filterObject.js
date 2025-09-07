'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))
var _objectKeys = _interopRequireDefault(require('./objectKeys'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const filterObject = function (obj, fn) {
  const thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj) ? obj.filter(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => {
    if ((0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }
    return newObj
  }, {})
}
var _default = exports.default = filterObject
