'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/esnext.async-iterator.for-each.js')

require('core-js/modules/esnext.iterator.constructor.js')

require('core-js/modules/esnext.iterator.for-each.js')

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/esnext.async-iterator.map.js')

require('core-js/modules/esnext.iterator.map.js')

require('core-js/stable')

var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Get a new copy of an existing Descriptor Detail
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptorDetail} originalDetail
 * @returns {module:objectDescriptors~descriptorDetail}
 */
var cloneDescriptorDetail = function cloneDescriptorDetail (originalDetail) {
  var copyDetail = {};
  (0, _objectKeys.default)(originalDetail).forEach(function (key) {
    copyDetail[key] = Array.isArray(originalDetail[key]) ? originalDetail[key].map(function (value) {
      return value
    }) : originalDetail[key]
  })
  return copyDetail
}

var _default = cloneDescriptorDetail
exports.default = _default
