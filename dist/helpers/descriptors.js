'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _assignDescriptor = _interopRequireDefault(require('./descriptors/assignDescriptor'))
var _assignDescriptorDetail = _interopRequireDefault(require('./descriptors/assignDescriptorDetail'))
var _checkClearValues = _interopRequireDefault(require('./descriptors/checkClearValues'))
var _checkDescriptorComplete = _interopRequireDefault(require('./descriptors/checkDescriptorComplete'))
var _cloneDescriptor = _interopRequireDefault(require('./descriptors/cloneDescriptor'))
var _cloneDescriptorDetail = _interopRequireDefault(require('./descriptors/cloneDescriptorDetail'))
var _compareDescriptor = _interopRequireDefault(require('./descriptors/compareDescriptor'))
var _describeObject = _interopRequireDefault(require('./descriptors/describeObject'))
var _describeObjectMap = _interopRequireDefault(require('./descriptors/describeObjectMap'))
var _describeObjectDetail = _interopRequireDefault(require('./descriptors/describeObjectDetail'))
var _nextReference = _interopRequireDefault(require('./descriptors/nextReference'))
var _sameDescriptor = _interopRequireDefault(require('./descriptors/sameDescriptor'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Create a format to standardize every object into a specific template.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 * @memberOf module:siFunciona
 */
var _default = exports.default = {
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
