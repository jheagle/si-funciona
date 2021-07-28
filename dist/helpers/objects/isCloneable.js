'use strict'

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

const _isInstanceObject = _interopRequireDefault(require('./isInstanceObject'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Determine if the value is a reference instance
 * @function
 * @param {Array|Object|*} value
 * @returns {boolean}
 */
const isCloneable = function isCloneable (value) {
  return _typeof(value) === 'object' && value !== null && !(0, _isInstanceObject.default)(value)
}

const _default = isCloneable
exports.default = _default
