'use strict'

require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/modules/es.array.from.js')
require('core-js/modules/es.regexp.exec.js')
require('core-js/modules/es.regexp.test.js')
require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.slice.js')
require('core-js/stable')
function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }
function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }
function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }
function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null || iter['@@iterator'] != null) return Array.from(iter) }
function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }
function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2 }
/**
 * Given a function, call with the correct number of paramters from an array of possible parameters.
 * @function
 * @memberOf module:functionHelpers
 * @param {Function} fn - The function to be called
 * @param {Array} params - Array of possible function parameters
 * @param {number} [minimum=2] - Minimumn number of parameters to use in the function
 * @returns {*}
 */
var callWithParams = function callWithParams (fn) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2
  return fn.apply(void 0, _toConsumableArray(params.slice(0, fn.length || minimum)))
}
var _default = callWithParams
exports.default = _default
