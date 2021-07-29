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

const _emptyObject = _interopRequireDefault(require('../objects/emptyObject'))

const _isCloneable = _interopRequireDefault(require('../objects/isCloneable'))

const _isInstanceObject = _interopRequireDefault(require('../objects/isInstanceObject'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Trace an object's attribute and provide details about it.
 * @function
 * @memberOf module:objectDescriptors
 * @param {*} value
 * @param {string|number} [key=0]
 * @param {number} [index=0]
 * @returns {module:objectDescriptors~descriptorDetail}
 */
const describeObjectDetail = function describeObjectDetail (value) {
  const key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  const index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0

  const type = _typeof(value)

  return {
    index: index,
    key: key,
    type: [type],
    value: [value],
    nullable: value === null,
    optional: false,
    circular: false,
    isReference: (0, _isCloneable.default)(value) && !(0, _emptyObject.default)(value),
    isInstance: (0, _isInstanceObject.default)(value),
    arrayReference: null,
    objectReference: null
  }
}

const _default = describeObjectDetail
exports.default = _default
