'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _cloneObject = _interopRequireDefault(require('../objects/cloneObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @memberOf module:arrayHelpers
 * @param {*} item - The item to be used for each array element
 * @param {number} length - The desired length of the array
 * @returns {Array.<*>}
 */
const buildArray = (item, length) => {
  const arr = []
  while (arr.length < length) {
    const cloned = (0, _cloneObject.default)(item)
    arr.push(cloned)
  }
  return arr
}
var _default = exports.default = buildArray
