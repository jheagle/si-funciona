'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'cloneObject', {
  enumerable: true,
  get: function () {
    return _cloneObject.default
  }
})
exports.default = void 0
Object.defineProperty(exports, 'dotGet', {
  enumerable: true,
  get: function () {
    return _dotGet.default
  }
})
Object.defineProperty(exports, 'dotNotate', {
  enumerable: true,
  get: function () {
    return _dotNotate.default
  }
})
Object.defineProperty(exports, 'dotSet', {
  enumerable: true,
  get: function () {
    return _dotSet.default
  }
})
Object.defineProperty(exports, 'dotUnset', {
  enumerable: true,
  get: function () {
    return _dotUnset.default
  }
})
Object.defineProperty(exports, 'emptyObject', {
  enumerable: true,
  get: function () {
    return _emptyObject.default
  }
})
Object.defineProperty(exports, 'filterObject', {
  enumerable: true,
  get: function () {
    return _filterObject.default
  }
})
Object.defineProperty(exports, 'isCloneable', {
  enumerable: true,
  get: function () {
    return _isCloneable.default
  }
})
Object.defineProperty(exports, 'isInstanceObject', {
  enumerable: true,
  get: function () {
    return _isInstanceObject.default
  }
})
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return _isObject.default
  }
})
Object.defineProperty(exports, 'mapObject', {
  enumerable: true,
  get: function () {
    return _mapObject.default
  }
})
Object.defineProperty(exports, 'mergeObjects', {
  enumerable: true,
  get: function () {
    return _mergeObjects.default
  }
})
Object.defineProperty(exports, 'mergeObjectsBase', {
  enumerable: true,
  get: function () {
    return _mergeObjectsBase.default
  }
})
Object.defineProperty(exports, 'mergeObjectsMutable', {
  enumerable: true,
  get: function () {
    return _mergeObjectsMutable.default
  }
})
Object.defineProperty(exports, 'objectKeys', {
  enumerable: true,
  get: function () {
    return _objectKeys.default
  }
})
Object.defineProperty(exports, 'objectValues', {
  enumerable: true,
  get: function () {
    return _objectValues.default
  }
})
Object.defineProperty(exports, 'reduceObject', {
  enumerable: true,
  get: function () {
    return _reduceObject.default
  }
})
Object.defineProperty(exports, 'setAndReturnValue', {
  enumerable: true,
  get: function () {
    return _setAndReturnValue.default
  }
})
Object.defineProperty(exports, 'setValue', {
  enumerable: true,
  get: function () {
    return _setValue.default
  }
})
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
function _interopRequireDefault (e) { return e && e.__esModule ? e : { default: e } }
/**
 * Simplify working with object by providing array-like parsing. Also, provides cloning and merging along with accessors that always have a return value for optimal nesting.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module objectHelpers
 * @memberOf module:siFunciona
 */
const _default = exports.default = {
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
