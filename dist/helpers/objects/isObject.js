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

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Check if the provided thing is an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {*} object
 * @returns {boolean}
 */
const isObject = function isObject (object) {
  return _typeof(object) === 'object' && object !== null
}

const _default = isObject
exports.default = _default
