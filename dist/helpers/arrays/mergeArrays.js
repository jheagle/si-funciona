'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.filter.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/modules/esnext.iterator.reduce.js')
require('core-js/stable')
var _uniqueArray = _interopRequireDefault(require('./uniqueArray'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Take multiple arrays and then filter all these into one unique array.
 * @memberOf module:arrayHelpers
 * @param {...Array} arrays - Provide multiple arrays to create one unique array
 * @returns {Array}
 */
const mergeArrays = function () {
  for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key]
  }
  return arrays.map(_uniqueArray.default).reduce((merged, arr) => [...merged, ...arr.filter(attr => !merged.includes(attr))], [])
}
var _default = exports.default = mergeArrays
