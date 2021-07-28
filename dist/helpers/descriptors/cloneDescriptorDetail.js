'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.map.js')

require('core-js/stable')

const _objectKeys = _interopRequireDefault(require('../objects/objectKeys'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * @typedef {Object} descriptorDetail
 * @property {number} index
 * @property {string|number} key
 * @property {Array.<string>} type
 * @property {Array} value
 * @property {boolean} nullable
 * @property {boolean} optional
 * @property {boolean} circular
 * @property {boolean} isReference
 * @property {boolean} isInstance
 * @property {null|number} arrayReference
 * @property {null|number} objectReference
 */

/**
 * Get a new copy of an existing Descriptor Detail
 * @param {descriptorDetail} originalDetail
 * @returns {descriptorDetail}
 */
const cloneDescriptorDetail = function cloneDescriptorDetail (originalDetail) {
  const copyDetail = {};
  (0, _objectKeys.default)(originalDetail).forEach(function (key) {
    copyDetail[key] = Array.isArray(originalDetail[key])
      ? originalDetail[key].map(function (value) {
        return value
      })
      : originalDetail[key]
  })
  return copyDetail
}

const _default = cloneDescriptorDetail
exports.default = _default
