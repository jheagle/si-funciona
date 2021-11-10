'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0

require('core-js/stable')

const _cloneObject = _interopRequireDefault(require('./objects/cloneObject.js'))

const _emptyObject = _interopRequireDefault(require('./objects/emptyObject.js'))

const _filterObject = _interopRequireDefault(require('./objects/filterObject.js'))

const _isCloneable = _interopRequireDefault(require('./objects/isCloneable.js'))

const _isInstanceObject = _interopRequireDefault(require('./objects/isInstanceObject.js'))

const _isObject = _interopRequireDefault(require('./objects/isObject.js'))

const _mapObject = _interopRequireDefault(require('./objects/mapObject.js'))

const _mergeObjects = _interopRequireDefault(require('./objects/mergeObjects.js'))

const _mergeObjectsBase = _interopRequireDefault(require('./objects/mergeObjectsBase.js'))

const _mergeObjectsMutable = _interopRequireDefault(require('./objects/mergeObjectsMutable.js'))

const _objectKeys = _interopRequireDefault(require('./objects/objectKeys.js'))

const _objectValues = _interopRequireDefault(require('./objects/objectValues.js'))

const _reduceObject = _interopRequireDefault(require('./objects/reduceObject.js'))

const _setAndReturnValue = _interopRequireDefault(require('./objects/setAndReturnValue.js'))

const _setValue = _interopRequireDefault(require('./objects/setValue.js'))

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:functionalHelpers
 */
const _default = {
  cloneObject: _cloneObject.default,
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
