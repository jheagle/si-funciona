'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.find.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/esnext.async-iterator.find.js')

require('core-js/modules/esnext.iterator.constructor.js')

require('core-js/modules/esnext.iterator.find.js')

require('core-js/stable')

const _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

/**
 * Find the index of the next module:objectDescriptors.descriptorDetail to build a resource for.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @param {number} currentReference
 * @returns {number|undefined}
 */
const nextReference = function nextReference (descriptor, currentReference) {
  return descriptor.references.find(function (nextRef) {
    if (nextRef <= currentReference) {
      return false
    }

    const val = descriptor.details[nextRef].value[descriptor.details[nextRef].value.length - 1]

    if (_typeof(val) !== 'object' || val === null || typeof val === 'undefined' || descriptor.details[nextRef].circular || descriptor.details[nextRef].isInstance) {
      return false
    }

    return !!(0, _objectKeys.default)(val).length
  })
}

const _default = nextReference
exports.default = _default
