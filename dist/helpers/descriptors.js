'use strict'

require('core-js/modules/es.object.define-property.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

var _assignDescriptor = _interopRequireDefault(require('./descriptors/assignDescriptor.js'))

var _assignDescriptorDetail = _interopRequireDefault(require('./descriptors/assignDescriptorDetail.js'))

var _checkClearValues = _interopRequireDefault(require('./descriptors/checkClearValues.js'))

var _checkDescriptorComplete = _interopRequireDefault(require('./descriptors/checkDescriptorComplete.js'))

var _cloneDescriptor = _interopRequireDefault(require('./descriptors/cloneDescriptor.js'))

var _cloneDescriptorDetail = _interopRequireDefault(require('./descriptors/cloneDescriptorDetail.js'))

var _compareDescriptor = _interopRequireDefault(require('./descriptors/compareDescriptor.js'))

var _describeObject = _interopRequireDefault(require('./descriptors/describeObject.js'))

var _describeObjectMap = _interopRequireDefault(require('./descriptors/describeObjectMap.js'))

var _describeObjectDetail = _interopRequireDefault(require('./descriptors/describeObjectDetail.js'))

var _nextReference = _interopRequireDefault(require('./descriptors/nextReference.js'))

var _sameDescriptor = _interopRequireDefault(require('./descriptors/sameDescriptor.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Create a format to standardize every object into a specific template.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:functionalHelpers
 */
var _default = {
  assignDescriptor: _assignDescriptor.default,
  assignDescriptorDetail: _assignDescriptorDetail.default,
  checkClearValues: _checkClearValues.default,
  checkDescriptorComplete: _checkDescriptorComplete.default,
  cloneDescriptor: _cloneDescriptor.default,
  cloneDescriptorDetail: _cloneDescriptorDetail.default,
  compareDescriptor: _compareDescriptor.default,
  describeObject: _describeObject.default,
  describeObjectMap: _describeObjectMap.default,
  describeObjectDetail: _describeObjectDetail.default,
  nextReference: _nextReference.default,
  sameDescriptor: _sameDescriptor.default
}
exports.default = _default
