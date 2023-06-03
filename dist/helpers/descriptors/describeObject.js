'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _assignDescriptorDetail = _interopRequireDefault(require('./assignDescriptorDetail'))
var _describeObjectDetail = _interopRequireDefault(require('./describeObjectDetail'))
var _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Trace an object and return the descriptor which defines the object's structure and attributes.
 * @function
 * @memberOf module:objectDescriptors
 * @param {Object} object
 * @returns {module:objectDescriptors~descriptor}
 */
const describeObject = object => {
  const descriptor = {
    index: 0,
    details: [],
    length: 0,
    keys: [],
    references: [],
    isArray: false,
    complete: false
  }
  const keys = (0, _objectKeys.default)(object)
  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i]
    const newDetail = (0, _describeObjectDetail.default)(object[key], key, descriptor.length++)
    if (typeof key === 'number' && descriptor.details.length) {
      descriptor.details[0] = (0, _assignDescriptorDetail.default)(descriptor.details[0], newDetail)
      descriptor.keys = [0]
      if (newDetail.isReference) {
        descriptor.references = [0]
      }
      continue
    }
    descriptor.details.push(newDetail)
    descriptor.keys.push(newDetail.key)
    if (newDetail.isReference) {
      descriptor.references.push(newDetail.index)
    }
  }
  descriptor.isArray = Array.isArray(object)
  descriptor.complete = !descriptor.references.length
  return descriptor
}
var _default = describeObject
exports.default = _default
