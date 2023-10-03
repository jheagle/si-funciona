'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _cloneObject = _interopRequireDefault(require('./objects/cloneObject'))
var _dotGet = _interopRequireDefault(require('./objects/dotGet'))
var _dotNotate = _interopRequireDefault(require('./objects/dotNotate'))
var _dotSet = _interopRequireDefault(require('./objects/dotSet'))
var _dotUnset = _interopRequireDefault(require('./objects/dotUnset'))
var _emptyObject = _interopRequireDefault(require('./objects/emptyObject'))
var _filterObject = _interopRequireDefault(require('./objects/filterObject'))
var _isCloneable = _interopRequireDefault(require('./objects/isCloneable'))
var _isInstanceObject = _interopRequireDefault(require('./objects/isInstanceObject'))
var _isObject = _interopRequireDefault(require('./objects/isObject'))
var _mapObject = _interopRequireDefault(require('./objects/mapObject'))
var _mergeObjects = _interopRequireDefault(require('./objects/mergeObjects'))
var _mergeObjectsBase = _interopRequireDefault(require('./objects/mergeObjectsBase'))
var _mergeObjectsMutable = _interopRequireDefault(require('./objects/mergeObjectsMutable'))
var _objectKeys = _interopRequireDefault(require('./objects/objectKeys'))
var _objectValues = _interopRequireDefault(require('./objects/objectValues'))
var _reduceObject = _interopRequireDefault(require('./objects/reduceObject'))
var _setAndReturnValue = _interopRequireDefault(require('./objects/setAndReturnValue'))
var _setValue = _interopRequireDefault(require('./objects/setValue'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:siFunciona
 */
var _default = exports.default = {
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
