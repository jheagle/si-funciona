'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _assignDescriptorDetail = _interopRequireDefault(require('./assignDescriptorDetail'))
const _describeObjectDetail = _interopRequireDefault(require('./describeObjectDetail'))
const _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Trace a single object or array (not its nested objects/arrays - see
 * {@link module:objectDescriptors.describeObjectMap} for that) and return the descriptor which defines its own
 * structure and attributes.
 * @memberOf module:objectDescriptors
 * @param {Object|Array} object - The object or array to describe.
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
    // @ts-ignore
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
const _default = exports.default = describeObject
