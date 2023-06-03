'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _cloneObject = _interopRequireDefault(require('./objects/cloneObject.js'))
var _dotGet = _interopRequireDefault(require('./objects/dotGet.js'))
var _dotNotate = _interopRequireDefault(require('./objects/dotNotate.js'))
var _dotSet = _interopRequireDefault(require('./objects/dotSet.js'))
var _dotUnset = _interopRequireDefault(require('./objects/dotUnset.js'))
var _emptyObject = _interopRequireDefault(require('./objects/emptyObject.js'))
var _filterObject = _interopRequireDefault(require('./objects/filterObject.js'))
var _isCloneable = _interopRequireDefault(require('./objects/isCloneable.js'))
var _isInstanceObject = _interopRequireDefault(require('./objects/isInstanceObject.js'))
var _isObject = _interopRequireDefault(require('./objects/isObject.js'))
var _mapObject = _interopRequireDefault(require('./objects/mapObject.js'))
var _mergeObjects = _interopRequireDefault(require('./objects/mergeObjects.js'))
var _mergeObjectsBase = _interopRequireDefault(require('./objects/mergeObjectsBase.js'))
var _mergeObjectsMutable = _interopRequireDefault(require('./objects/mergeObjectsMutable.js'))
var _objectKeys = _interopRequireDefault(require('./objects/objectKeys.js'))
var _objectValues = _interopRequireDefault(require('./objects/objectValues.js'))
var _reduceObject = _interopRequireDefault(require('./objects/reduceObject.js'))
var _setAndReturnValue = _interopRequireDefault(require('./objects/setAndReturnValue.js'))
var _setValue = _interopRequireDefault(require('./objects/setValue.js'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:siFunciona
 */
var _default = {
  cloneObject: _cloneObject.default,
  dotGet: _dotGet.default,
  dotNotate: _dotNotate.default,
  dotSet: _dotSet.default,
  dotUnset: _dotUnset.default,
  emptyObject: _emptyObject.default,
  filterObject: _filterObject.default,
  isCloneable: _isCloneable.default,
  isInstanceObject: _isInstanceObject.default,
  isObject: _isObject.default,
  mapObject: _mapObject.default,
  mergeObjects: _mergeObjects.default,
  mergeObjectsBase: _mergeObjectsBase.default,
  mergeObjectsMutable: _mergeObjectsMutable.default,
  objectKeys: _objectKeys.default,
  objectValues: _objectValues.default,
  reduceObject: _reduceObject.default,
  setAndReturnValue: _setAndReturnValue.default,
  setValue: _setValue.default
}
exports.default = _default
