'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/stable')

const _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))

const _objectKeys = _interopRequireDefault(require('./objectKeys'))

const _setValue = _interopRequireDefault(require('./setValue'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Function that produces a property of the new Object, taking three arguments
 * @callback mapCallback
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object map was called upon.
 * @returns {*}
 */

/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @function
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {mapCallback|Function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const mapObject = function mapObject (obj, fn) {
  const thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj)
    ? obj.map(fn, thisArg)
    : (0, _objectKeys.default)(obj, true).reduce(function (newObj, curr) {
        return (0, _setValue.default)(curr, (0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2), newObj)
      }, {})
}

const _default = mapObject
exports.default = _default
