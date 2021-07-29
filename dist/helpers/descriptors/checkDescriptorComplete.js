'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _setValue = _interopRequireDefault(require('../objects/setValue'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Check if the descriptors references have all been built and set complete to true if they have.
 * @function
 * @memberOf module:objectDescriptors
 * @param {module:objectDescriptors~descriptor} descriptor
 * @returns {module:objectDescriptors~descriptor}
 */
const checkDescriptorComplete = function checkDescriptorComplete (descriptor) {
  return (0, _setValue.default)('complete', descriptor.references.every(function (refId) {
    return [descriptor.details[refId].arrayReference, descriptor.details[refId].objectReference].some(function (ref) {
      return typeof ref === 'number'
    })
  }), descriptor)
}

const _default = checkDescriptorComplete
exports.default = _default
