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
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * A "descriptor" is a flat, serializable snapshot of an object or array's shape: for each property, its type(s),
 * whether it's nullable, and - if the property's own value is itself an object/array - a reference to that nested
 * value's own descriptor elsewhere in the same list, rather than nesting descriptors inside descriptors. This flat,
 * reference-based structure is what lets these utilities walk deeply nested and even circular object graphs (an
 * object that contains itself, directly or indirectly) without infinite recursion, since a value that's already
 * been described is simply pointed to again instead of re-described.
 *
 * Start with {@link module:objectDescriptors.describeObjectMap}, which takes any real object or array and produces
 * this flat list of descriptors for you - the other functions here (comparing, merging, cloning descriptors) are
 * building blocks used internally, or useful once you already have descriptors to work with directly.
 *
 * The concrete use this module has earned its keep on: describing two objects and comparing the results tells
 * you whether they're the same shape and values even when they're different references entirely (see
 * {@link module:objectDescriptors.sameDescriptor}/{@link module:objectDescriptors.compareDescriptor}) - useful
 * anywhere you need to check that two objects genuinely match without caring whether they're literally the same
 * instance. A descriptor also doubles as a flat, structured summary of an object's shape, which can be handy for
 * discussion or assessment purposes (e.g. describing what an object looks like without dumping the whole thing).
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
