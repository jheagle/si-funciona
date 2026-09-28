'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _cloneObject = _interopRequireDefault(require('../objects/cloneObject'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Leverage buildArrayBase to generate an array filled with a copy of the provided item.
 * The length defines how long the array should be.
 * @param item - The item to be used for each array element
 * @param length - The desired length of the array
 */
const buildArray = (item, length) => {
  const arr = []
  while (arr.length < length) {
    const cloned = (0, _cloneObject.default)(item)
    arr.push(cloned)
  }
  return arr
}
const _default = exports.default = buildArray
