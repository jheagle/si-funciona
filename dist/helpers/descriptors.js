'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _assignDescriptor = _interopRequireDefault(require('./descriptors/assignDescriptor'))

const _assignDescriptorDetail = _interopRequireDefault(require('./descriptors/assignDescriptorDetail'))

const _checkClearValues = _interopRequireDefault(require('./descriptors/checkClearValues'))

const _checkDescriptorComplete = _interopRequireDefault(require('./descriptors/checkDescriptorComplete'))

const _cloneDescriptor = _interopRequireDefault(require('./descriptors/cloneDescriptor'))

const _cloneDescriptorDetail = _interopRequireDefault(require('./descriptors/cloneDescriptorDetail'))

const _compareDescriptor = _interopRequireDefault(require('./descriptors/compareDescriptor'))

const _describeObject = _interopRequireDefault(require('./descriptors/describeObject'))

const _describeObjectMap = _interopRequireDefault(require('./descriptors/describeObjectMap'))

const _describeObjectDetail = _interopRequireDefault(require('./descriptors/describeObjectDetail'))

const _nextReference = _interopRequireDefault(require('./descriptors/nextReference'))

const _sameDescriptor = _interopRequireDefault(require('./descriptors/sameDescriptor'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Create a format to standarize every object into a specific template.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectDescriptors
 */
const _default = {
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
