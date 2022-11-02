'use strict'

require('core-js/modules/es.object.define-property.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.array.map.js')
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
require('core-js/stable')
var _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable} [options.map=[]]
 * @returns {Object}
 */
var cloneObject = function cloneObject (object) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  var _ref$relevancyRange = _ref.relevancyRange
  var relevancyRange = _ref$relevancyRange === void 0 ? 100 : _ref$relevancyRange
  var _ref$map = _ref.map
  var map = _ref$map === void 0 ? [] : _ref$map
  return (0, _mergeObjectsBase.default)({
    mapLimit: mapLimit,
    depthLimit: depthLimit,
    relevancyRange: relevancyRange,
    map: map,
    useClone: true
  })(object)
}
var _default = cloneObject
exports.default = _default
