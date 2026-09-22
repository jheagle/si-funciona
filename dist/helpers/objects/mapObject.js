'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.iterator.reduce.js')
const _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))
const _objectKeys = _interopRequireDefault(require('./objectKeys'))
const _setValue = _interopRequireDefault(require('./setValue'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {module:objectHelpers~mapCallback|Function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const mapObject = (obj, fn, thisArg = undefined) => Array.isArray(obj) ? obj.map(fn, thisArg) : (0, _objectKeys.default)(obj, true).reduce((newObj, curr) => (0, _setValue.default)(curr, (0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2), newObj), {})
const _default = exports.default = mapObject
