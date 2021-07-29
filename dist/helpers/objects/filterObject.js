'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/stable')

const _callWithParams = _interopRequireDefault(require('../functions/callWithParams'))

const _objectKeys = _interopRequireDefault(require('./objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Function is a predicate, to test each property value of the object. Return true to keep the element, false
 * otherwise, taking three arguments
 * @callback module:objectHelpers~filterCallback
 * @memberOf module:objectHelpers
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object filter was called upon.
 * @returns {boolean}
 */

/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const filterObject = function filterObject (obj, fn) {
  const thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined
  return Array.isArray(obj)
    ? obj.filter(fn, thisArg)
    : (0, _objectKeys.default)(obj, true).reduce(function (newObj, curr) {
        if ((0, _callWithParams.default)(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
          newObj[curr] = obj[curr]
        } else {
          delete newObj[curr]
        }

        return newObj
      }, {})
}

const _default = filterObject
exports.default = _default
