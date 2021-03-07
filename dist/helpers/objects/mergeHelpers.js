'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.processMergeIdentifiers = exports.processMergeIdentifier = exports.zipper = exports.findMergeReferenceKeys = exports.mergeReferenceArrays = exports.createMergeReferenceIdentifier = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.find-index.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.concat.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.splice.js')

require('core-js/modules/es.array.filter.js')

var _arrays = require('../arrays')

var _functions = require('../functions')

var _objects = require('../objects')

var _cloneHelpers = require('./cloneHelpers')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

/**
 * Store information about a reference, including pointing to linked references and storing original reference.
 * @typedef {Object.<string, number|Object|Array>} mergeReferenceIdentifier
 * @property {Array.<string|number>} circular
 * @property {boolean} complete
 * @property {number} index
 * @property {Array|Object} clone
 * @property {Array|Object} object
 * @property {Array|Object} original
 * @property {Array.<string|number>} references
 * @property {Array.<number>} referers
 * @property {Array.<module:cloneHelpers~referenceIdentifier>} identifiers
 */

/**
 * Create a mergeReferenceIdentifier for building the object clone.
 * @function
 * @param {Array.<Array|Object>} [objects=[]]
 * @param {number} [index=0]
 * @param {Array.<number>} [referers=[]]
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */
var createMergeReferenceIdentifier = function createMergeReferenceIdentifier () {
  var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var referers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []
  var identifiers = objects.map(function (identifier) {
    return (0, _cloneHelpers.createReferenceIdentifier)(identifier, index, referers)
  })
  var newIdentifier = (0, _cloneHelpers.createReferenceIdentifier)(objects[0], index, referers)
  newIdentifier.object = Array.isArray(newIdentifier.original) ? [] : {}
  newIdentifier.identifiers = identifiers
  return newIdentifier
}
/**
 * Remove duplicate references from an array of references
 * @param {Array.<string|number|Array>} newRefs
 * @param {string|number|Array} ref
 * @returns {Array.<string|number|Array>}
 */

exports.createMergeReferenceIdentifier = createMergeReferenceIdentifier

var mergeReferenceArrays = function mergeReferenceArrays (newRefs, ref) {
  if (!Array.isArray(ref)) {
    var _existingRefKey = newRefs.findIndex(function (r) {
      return Array.isArray(r) ? r[0] === ref : r === ref
    })

    if (_existingRefKey < 0) {
      newRefs.push(ref)
    }

    return newRefs
  }

  var existingRefKey = newRefs.findIndex(function (r) {
    return Array.isArray(r) ? r[0] === ref[0] : r === ref[0]
  })

  if (Array.isArray(ref[1])) {
    ref[1] = ref[1].reduce(mergeReferenceArrays, [])
  }

  if (existingRefKey < 0) {
    return [].concat(_toConsumableArray(newRefs), [ref])
  }

  if (!Array.isArray(newRefs[existingRefKey])) {
    return (0, _objects.setValue)(existingRefKey, ref, newRefs)
  }

  if (newRefs[existingRefKey].length === 1) {
    return (0, _objects.setValue)(existingRefKey, ref, newRefs)
  }

  var newPart = newRefs[existingRefKey][1]

  if (!Array.isArray(newPart)) {
    return (0, _objects.setValue)(existingRefKey, [ref[0], newPart], newRefs)
  }

  if (Array.isArray(ref[1])) {
    newPart = (0, _arrays.mergeArrays)(newPart, ref[1])
  }

  if (!Array.isArray(ref[1]) && Array.isArray(newPart)) {
    newPart.push(ref[1])
  }

  return (0, _objects.setValue)(existingRefKey, [ref[0], newPart.reduce(mergeReferenceArrays, [])], newRefs)
}
/**
 * An array of reference identifiers linked together.
 * @typedef {Array.<module:mergeHelpers~mergeReferenceIdentifier>} mergeReferenceMap
 */

/**
 * For all of the identified references, find the index of the corresponding referenceIdentifier
 * or create a new one and set the index instead of null.
 * @function
 * @param {module:mergeHelpers~mergeReferenceMap} [referenceMap=[]]
 * @param {number} [index=0]
 * @param {boolean} [maxDepth=false]
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */

exports.mergeReferenceArrays = mergeReferenceArrays

var findMergeReferenceKeys = function findMergeReferenceKeys () {
  var referenceMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var maxDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false
  return referenceMap[index].references.reduce(function (newRef, key, i) {
    var objectsToRef = newRef.identifiers.reduce(function (objects, identifier) {
      var obj = identifier.original[key]

      if (typeof obj === 'undefined' || (0, _cloneHelpers.nonReference)(obj)) {
        return objects
      }

      return [].concat(_toConsumableArray(objects), [obj])
    }, [])
    var existingIndex = referenceMap.findIndex(function (existing) {
      return existing && existing.identifiers.some(function (identifier) {
        return objectsToRef.includes(identifier.original)
      })
    })

    if (existingIndex >= 0) {
      newRef.object[key] = existingIndex
      newRef.circular.push(key)
      referenceMap[existingIndex].referers.push(index)
      return newRef
    }

    if (maxDepth) {
      newRef.object[key] = Array.isArray(objectsToRef[0]) ? [] : {}
      return newRef
    }

    var newRefIndex = referenceMap[referenceMap.length - 1].index + 1
    newRef.object[key] = newRefIndex
    referenceMap[newRefIndex] = createMergeReferenceIdentifier(objectsToRef, newRefIndex, [index])
    return newRef
  }, referenceMap[index])
}
/**
 * Use the mergeReferenceIdentifiers identifiers list to zip objects together
 * @function
 * @param {module:mergeHelpers~mergeReferenceIdentifier} referenceIdentifier
 * @returns {module:mergeHelpers~mergeReferenceIdentifier}
 */

exports.findMergeReferenceKeys = findMergeReferenceKeys

var zipper = function zipper (referenceIdentifier) {
  referenceIdentifier.identifiers = referenceIdentifier.identifiers.map(function (identifier) {
    return (0, _cloneHelpers.findObjectReferences)(identifier)
  })

  var objRefs = _arrays.mergeArrays.apply(void 0, _toConsumableArray(referenceIdentifier.identifiers.map(function (identifier) {
    return identifier.references
  })))

  objRefs = objRefs.reduce(mergeReferenceArrays, [])
  var useArray = Array.isArray(referenceIdentifier.object)
  var keys = useArray ? _arrays.compareArrays.apply(void 0, _toConsumableArray(referenceIdentifier.identifiers.map(function (identifier) {
    return identifier.object
  }))) : _arrays.compareArrays.apply(void 0, _toConsumableArray(referenceIdentifier.identifiers.map(function (identifier) {
    return (0, _objects.objectKeys)(identifier.object)
  })))
  return keys.reduce(function (newIdentifier, compare) {
    var newKey = compare.value
    var newValue = null
    var storedValue = null

    for (var i = compare.result.length - 1; i >= 0; --i) {
      if (compare.result[i] < 0) {
        continue
      }

      if (useArray) {
        newKey = compare.keys[i][0]
      }

      newValue = referenceIdentifier.identifiers[i].object[newKey]

      if (storedValue === null && (0, _objects.emptyObject)(newValue)) {
        storedValue = newValue
        continue
      }

      break
    }

    if (storedValue !== null && newValue !== null) {
      newValue = storedValue
    }

    if (newValue !== null) {
      var refIndex = objRefs.findIndex(function (ref) {
        if (Array.isArray(ref)) {
          if (Array.isArray(ref[0])) {
            return ref[0][0] === newKey
          }

          return ref[0] === newKey
        }

        return ref === newKey
      })

      if (refIndex >= 0) {
        objRefs.splice(refIndex, 1)
      }
    }

    newIdentifier.references = objRefs

    if (useArray) {
      newIdentifier.object.push(newValue)
      return newIdentifier
    }

    newIdentifier.object[newKey] = newValue
    return newIdentifier
  }, referenceIdentifier)
}
/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:mergeHelpers~mergeReferenceMap} referenceMap
 * @param {Array.<module:mergeHelpers~mergeReferenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<{module:mergeHelpers~mergeReferenceIdentifier}>}
 */

exports.zipper = zipper

var processMergeIdentifier = function processMergeIdentifier (referenceMap, moreReferences) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

  var currentIndex = 0
  var isMaxDepth = false
  referenceMap = (0, _functions.pipe)(function (identifier) {
    return (0, _cloneHelpers.findReferenceIndex)(referenceMap, identifier.index)
  }, function (index) {
    currentIndex = index
    return zipper(referenceMap[currentIndex])
  }, function (identifier) {
    return (0, _cloneHelpers.getIdentifierDepth)(referenceMap, identifier)
  }, function (currentDepth) {
    return currentDepth === depthLimit
  }, function (maxDepth) {
    isMaxDepth = maxDepth
    return findMergeReferenceKeys(referenceMap, currentIndex, isMaxDepth)
  }, function (identifier) {
    if (isMaxDepth) {
      referenceMap[currentIndex].references = identifier.circular
    }

    referenceMap[currentIndex].complete = true
    var references = referenceMap[currentIndex].references.filter(function (refKey) {
      return !identifier.circular.includes(refKey)
    })
    moreReferences = [].concat(_toConsumableArray(moreReferences), _toConsumableArray(references.map(function (key) {
      return referenceMap[identifier.object[key]]
    })))
    return referenceMap.length >= mapLimit
  }, function (maxLimit) {
    return maxLimit ? (0, _cloneHelpers.linkReferences)(referenceMap) : referenceMap
  })(moreReferences.shift())
  return moreReferences
}
/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:mergeHelpers~mergeReferenceMap}
 */

exports.processMergeIdentifier = processMergeIdentifier

var processMergeIdentifiers = function processMergeIdentifiers (objects) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  var referenceMap = [createMergeReferenceIdentifier(objects, 0)]
  var moreReferences = [referenceMap[0]]

  do {
    moreReferences = processMergeIdentifier(referenceMap, moreReferences, {
      mapLimit: mapLimit,
      depthLimit: depthLimit
    })
  } while (moreReferences.length > 0)

  return referenceMap
}

exports.processMergeIdentifiers = processMergeIdentifiers
