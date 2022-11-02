'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.symbol.js')
require('core-js/modules/es.symbol.description.js')
require('core-js/modules/es.object.to-string.js')
require('core-js/modules/es.symbol.iterator.js')
require('core-js/modules/es.array.iterator.js')
require('core-js/modules/es.string.iterator.js')
require('core-js/modules/web.dom-collections.iterator.js')
require('core-js/stable')
var _isInstanceObject = _interopRequireDefault(require('./isInstanceObject'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
function _typeof (obj) { '@babel/helpers - typeof'; return _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }, _typeof(obj) }
/**
 * Determine if the value is a reference instance
 * @function
 * @memberOf module:objectHelpers
 * @param {Array|Object|*} value
 * @returns {boolean}
 */
var isCloneable = function isCloneable (value) {
  return _typeof(value) === 'object' && value !== null && !(0, _isInstanceObject.default)(value)
}
var _default = isCloneable
exports.default = _default
