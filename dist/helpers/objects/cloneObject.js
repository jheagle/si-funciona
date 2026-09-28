'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
const _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @param object - The original object that is being cloned
 * @param options
 * @param options.mapLimit - Deprecated and ignored (circular references are handled without trimming).
 * @param options.depthLimit - Control how many nested levels deep will be used, -1 = no limit, >-1 = nth level limited.
 * @param options.relevancyRange - Deprecated and ignored: see mapLimit.
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
