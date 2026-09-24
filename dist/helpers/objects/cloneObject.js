'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100] - Deprecated and ignored (circular references are handled without trimming).
 * @param {number} [options.depthLimit=-1] - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param {number} [options.relevancyRange=1000] - Deprecated and ignored: see mapLimit.
 * @returns {Object}
 */
const cloneObject = (object, {
  mapLimit = 100,
  depthLimit = -1,
  relevancyRange = 1000
} = {}) => (0, _mergeObjectsBase.default)({
  mapLimit,
  depthLimit,
  relevancyRange,
  useClone: true
})(object)
const _default = exports.default = cloneObject
