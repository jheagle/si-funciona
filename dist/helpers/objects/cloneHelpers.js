'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.from.js')

require('core-js/modules/es.array.slice.js')

require('core-js/modules/es.function.name.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.processIdentifiers = exports.processIdentifier = exports.linkReferences = exports.removeFromReferenceMap = exports.linkReferenceObject = exports.objectAndReferences = exports.getIdentifierDepth = exports.findReference = exports.findReferenceIndex = exports.findReferenceKeys = exports.findObjectReferences = exports.createReferenceIdentifier = exports.nonReference = void 0

require('core-js/modules/es.object.assign.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.array.find-index.js')

require('core-js/modules/es.array.splice.js')

require('core-js/modules/es.array.concat.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.filter.js')

var _functions = require('../functions')

var _objects = require('../objects')

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.') }

function _unsupportedIterableToArray (o, minLen) { if (!o) return; if (typeof o === 'string') return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === 'Object' && o.constructor) n = o.constructor.name; if (n === 'Map' || n === 'Set') return Array.from(o); if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray (iter) { if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray (arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

/**
 * Check if this value represents an object that needs to be used as a reference.
 * @function
 * @param {*} value - Some value to test if it is a reference.
 * @returns {boolean}
 */
var nonReference = function nonReference (value) {
  return !(0, _objects.isCloneable)(value)
}
/**
 * Store information about a reference, including pointing to linked references and storing original reference.
 * @typedef {Object.<string, number|Object|Array>} referenceIdentifier
 * @property {Array.<string|number>} circular
 * @property {boolean} complete
 * @property {number} index
 * @property {Array|Object} clone
 * @property {Array|Object} object
 * @property {Array|Object} original
 * @property {Array.<string|number>} references
 * @property {Array.<number>} referers
 */

/**
 * Create a referenceIdentifier for building the object clone.
 * @function
 * @param {Array|Object} [object=null]
 * @param {number} [index=0]
 * @param {Array.<number>} [referers=[]]
 * @returns {module:cloneHelpers~referenceIdentifier}
 */

exports.nonReference = nonReference

var createReferenceIdentifier = function createReferenceIdentifier () {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var referers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []
  return Object.assign({}, {
    circular: [],
    complete: false,
    index: index,
    object: null,
    original: object,
    references: [],
    referers: referers
  })
}
/**
 * Update the object of this reference identifier by cloning the object or array and setting child references to null.
 * Every reference that is found has it's key added to the array of references.
 * @function
 * @param {module:cloneHelpers~referenceIdentifier} referenceIdentifier
 * @returns {module:cloneHelpers~referenceIdentifier}
 */

exports.createReferenceIdentifier = createReferenceIdentifier

var findObjectReferences = function findObjectReferences (referenceIdentifier) {
  return (0, _objects.setValue)('object', (0, _objects.mapObject)(referenceIdentifier.original, function (item, key) {
    if (nonReference(item)) {
      return item
    }

    referenceIdentifier.references.push(key)
    return null
  }), referenceIdentifier)
}
/**
 * An array of reference identifiers linked together.
 * @typedef {Array.<module:cloneHelpers~referenceIdentifier>} referenceMap
 */

/**
 * For all of the identified references, find the index of the corresponding referenceIdentifier
 * or create a new one and set the index instead of null.
 * @function
 * @param {module:cloneHelpers~referenceMap} [referenceMap=[]]
 * @param {number} [index=0]
 * @param {boolean} [maxDepth=false]
 * @returns {module:cloneHelpers~referenceIdentifier}
 */

exports.findObjectReferences = findObjectReferences

var findReferenceKeys = function findReferenceKeys () {
  var referenceMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var maxDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false
  return referenceMap[index].references.reduce(function (newRef, key, i) {
    var objectToRef = newRef.original[key]
    var existingIndex = referenceMap.findIndex(function (existing) {
      return existing && objectToRef === existing.original
    })

    if (existingIndex >= 0) {
      newRef.object[key] = existingIndex
      newRef.circular.push(key)
      referenceMap[existingIndex].referers.push(index)
      return newRef
    }

    if (maxDepth) {
      newRef.object[key] = Array.isArray(newRef.original[key]) ? [] : {}
      return newRef
    }

    var newRefIndex = referenceMap[referenceMap.length - 1].index + 1
    newRef.object[key] = newRefIndex
    referenceMap[newRefIndex] = createReferenceIdentifier(objectToRef, newRefIndex, [index])
    return newRef
  }, referenceMap[index])
}
/**
 * Find the array index of the provided reference identifier within the reference map.
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @param {number} [index=0]
 * @returns {number}
 */

exports.findReferenceKeys = findReferenceKeys

var findReferenceIndex = function findReferenceIndex (referenceMap) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  var nextReference = referenceMap[index]

  if (nextReference && nextReference.index === index) {
    return index
  }

  if (nextReference && nextReference.index > index) {
    var tryIndex = index

    while (--tryIndex >= 0) {
      if (referenceMap[tryIndex] && referenceMap[tryIndex].index === index) {
        return tryIndex
      }
    }
  }

  return referenceMap.findIndex(function (ref) {
    return typeof ref !== 'undefined' && ref.index === index
  })
}
/**
 * Find a referenced identifier by index form the reference map.
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @param {number} [index=0]
 * @returns {module:cloneHelpers~referenceIdentifier}
 */

exports.findReferenceIndex = findReferenceIndex

var findReference = function findReference (referenceMap) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  return referenceMap[findReferenceIndex(referenceMap, index)]
}

exports.findReference = findReference

var getIdentifierDepth = function getIdentifierDepth (referenceMap, identifier) {
  if (!identifier.referers.length) {
    return 0
  }

  var lowestReferer = Math.min.apply(Math, _toConsumableArray(identifier.referers))

  if (lowestReferer >= identifier.index) {
    return 0
  }

  if (lowestReferer === 0) {
    return 1
  }

  var refererReference = findReference(referenceMap, lowestReferer)

  if (!refererReference) {
    return lowestReferer
  }

  return 1 + getIdentifierDepth(referenceMap, refererReference)
}
/**
 * Check if there are any remaining reference identifiers which are complete, excluded first in map.
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @returns {boolean}
 */

exports.getIdentifierDepth = getIdentifierDepth

var hasCompletedReferences = function hasCompletedReferences (referenceMap) {
  return referenceMap.some(function (newRef) {
    return newRef.index > 0 && newRef.complete
  }) || referenceMap.length === 1 && referenceMap[0].references.length
}
/**
 * Store a bundle containing an object, references array, and remove array.
 * @typedef {Object} objectReferencesRemove
 * @property {number} index
 * @property {Array|Object} object
 * @property {Array.<string|number>} references
 * @property {module:cloneHelpers~referenceMap} remove
 */

/**
 * Create a return type package containing an object, references to find, and array of items to remove.
 * @function
 * @param {Array|Object} [object={}]
 * @param {Array.<string|number>} [references=[]]
 * @param {number} [index=0]
 * @returns {module:cloneHelpers~objectReferencesRemove}
 */

var objectAndReferences = function objectAndReferences () {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var references = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  return Object.assign({}, {
    index: index,
    object: object,
    references: references,
    remove: []
  })
}
/**
 * Used as callback for reduce, this function will find reference identifier associated with a number
 * then link the key on the object with the object of the reference identifier. The return is a bundle
 * containing the linked object, updated references array, and an array of identifiers to be deleted
 * since these are no longer required in the reference map.
 * @typedef {Function} referencesReduce
 * @param {module:cloneHelpers~objectReferencesRemove} results
 * @param {number|string} key
 * @param {number} i
 * @returns {module:cloneHelpers~objectReferencesRemove}
 */

/**
 * Return the referencesReduce callback.
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @returns {module:cloneHelpers~referencesReduce}
 */

exports.objectAndReferences = objectAndReferences

var linkReferenceObject = function linkReferenceObject (referenceMap) {
  return function (results, key, i) {
    var isCircular = false
    var keyArray = key

    if (Array.isArray(key)) {
      keyArray = Array.isArray(key[0]) ? key[0] : key

      if (keyArray[1] === null) {
        key = keyArray[0]
        isCircular = true
      }
    }

    if (Array.isArray(key)) {
      var remove = []
      var nextObject = results.object[keyArray[0]]

      if (typeof nextObject === 'number') {
        results.index = nextObject
      }

      ;

      var _keyArray$1$reduce = keyArray[1].reduce(linkReferenceObject(referenceMap), objectAndReferences(nextObject, keyArray[1], results.index))

      results.object[keyArray[0]] = _keyArray$1$reduce.object
      remove = _keyArray$1$reduce.remove

      if (!results.references[i][1].length) {
        results.references.splice(i, 1)
      }

      results.remove = [].concat(_toConsumableArray(results.remove), _toConsumableArray(remove))
      return results
    }

    var nextRef = findReference(referenceMap, results.object[key])

    if (!nextRef.complete) {
      return results
    }

    results.object[key] = nextRef.object
    nextRef.referers.splice(nextRef.referers.findIndex(function (i) {
      return i === results.index
    }), 1)
    var nextReferences = nextRef.references.map(function (ref) {
      return nextRef.circular.includes(ref) ? [ref, null] : ref
    })
    results.remove.push(nextRef)

    if (nextReferences.length && !isCircular) {
      results.references[i] = [key, nextReferences]
      return results
    }

    results.references.splice(i, 1)
    return results
  }
}
/**
 * Given a referenceIdentifier, find it in the referenceMap and remove it, return true. If unable
 * to remove then return false.
 * @typedef {Function} removeReferenceIdentifier
 * @param {module:cloneHelpers~referenceIdentifier} results
 * @returns {boolean}
 */

/**
 * Return the remove reference identifier callback.
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @returns {module:cloneHelpers~removeReferenceIdentifier}
 */

exports.linkReferenceObject = linkReferenceObject

var removeFromReferenceMap = function removeFromReferenceMap (referenceMap) {
  return function (referenceIdentifier) {
    var removeIndex = findReferenceIndex(referenceMap, referenceIdentifier.index)

    if (removeIndex <= 0 || referenceIdentifier.referers.length) {
      return removeIndex === 0
    }

    referenceMap.splice(removeIndex, 1)
    var removeReferer = referenceMap[0].referers.indexOf(referenceIdentifier.index)

    if (removeReferer >= 0) {
      referenceMap[0].referers.splice(removeReferer, 1)
    }

    return true
  }
}
/**
 * Find each of the unlinked references and assign the newly cloned reference for each.
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @returns {module:cloneHelpers~referenceMap}
 */

exports.removeFromReferenceMap = removeFromReferenceMap

var linkReferences = function linkReferences (referenceMap) {
  if (!referenceMap[0].complete) {
    return referenceMap
  }

  var remove = []

  var _referenceMap$0$refer = referenceMap[0].references.reduce(linkReferenceObject(referenceMap), objectAndReferences(referenceMap[0].object, referenceMap[0].references, 0))

  referenceMap[0].object = _referenceMap$0$refer.object
  referenceMap[0].references = _referenceMap$0$refer.references
  remove = _referenceMap$0$refer.remove
  remove.forEach(removeFromReferenceMap(referenceMap))
  return hasCompletedReferences(referenceMap) ? linkReferences(referenceMap) : referenceMap
}
/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:cloneHelpers~referenceMap} referenceMap
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<module:cloneHelpers~referenceIdentifier>}
 */

exports.linkReferences = linkReferences

var processIdentifier = function processIdentifier (referenceMap, moreReferences) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  var _ref$mapLimit = _ref.mapLimit
  var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
  var _ref$depthLimit = _ref.depthLimit
  var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

  var currentIndex = 0
  var isMaxDepth = false
  referenceMap = (0, _functions.pipe)(function (identifier) {
    return findReferenceIndex(referenceMap, identifier.index)
  }, function (index) {
    currentIndex = index
    return findObjectReferences(referenceMap[currentIndex])
  }, function (identifier) {
    return getIdentifierDepth(referenceMap, identifier)
  }, function (currentDepth) {
    return currentDepth === depthLimit
  }, function (maxDepth) {
    isMaxDepth = maxDepth
    return findReferenceKeys(referenceMap, currentIndex, isMaxDepth)
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
    return maxLimit ? linkReferences(referenceMap) : referenceMap
  })(moreReferences.shift())
  return moreReferences
}
/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:cloneHelpers~referenceMap}
 */

exports.processIdentifier = processIdentifier

var processIdentifiers = function processIdentifiers (object) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  var referenceMap = [createReferenceIdentifier(object, 0)]
  var moreReferences = [referenceMap[0]]

  do {
    moreReferences = processIdentifier(referenceMap, moreReferences, {
      mapLimit: mapLimit,
      depthLimit: depthLimit
    })
  } while (moreReferences.length > 0)

  return referenceMap
}

exports.processIdentifiers = processIdentifiers
