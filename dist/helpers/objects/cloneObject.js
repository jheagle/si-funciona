'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/modules/es.array.map.js')

require('core-js/stable')

const _mergeObjectsBase = _interopRequireDefault(require('./mergeObjectsBase'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Clone objects for manipulation without data corruption, returns a copy of the provided object.
 * @function
 * @param {Object} object - The original object that is being cloned
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=1000]
 * @param {number} [options.depthLimit=-1]
 * @param {number} [options.relevancyRange=100]
 * @param {Iterable} [options.map=[]]
 * @returns {Object}
 */
const cloneObject = function cloneObject (object) {
  const _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const _ref$mapLimit = _ref.mapLimit
  const mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  const _ref$depthLimit = _ref.depthLimit
  const depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit
  const _ref$relevancyRange = _ref.relevancyRange
  const relevancyRange = _ref$relevancyRange === void 0 ? 100 : _ref$relevancyRange
  const _ref$map = _ref.map
  const map = _ref$map === void 0 ? [] : _ref$map

  return (0, _mergeObjectsBase.default)({
    mapLimit: mapLimit,
    depthLimit: depthLimit,
    relevancyRange: relevancyRange,
    map: map,
    useClone: true
  })(object)
}

const _default = cloneObject
exports.default = _default
