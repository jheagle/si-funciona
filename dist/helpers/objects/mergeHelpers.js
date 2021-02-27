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
exports.processMergeIdentifiers = exports.processMergeIdentifer = exports.mergeReferences = exports.mergeReferenceObject = exports.mergeReferenceArrays = exports.mergeNonReferences = exports.createReferenceReplica = exports.getSimilarObject = void 0

require('core-js/modules/es.array.filter.js')

require('core-js/modules/es.array.includes.js')

require('core-js/modules/es.string.includes.js')

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.array.find.js')

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/web.dom-collections.for-each.js')

require('core-js/modules/es.array.find-index.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

require('core-js/modules/es.array.splice.js')

require('core-js/modules/es.array.concat.js')

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
 * Check if there are still references having a merged status of false.
 * @param {*} referenceMap
 * @returns {boolean}
 */
var hasUnmergedReferences = function hasUnmergedReferences (referenceMap) {
  return referenceMap.some(function (newRef) {
    return newRef.merged === false
  })
}

var getSimilarObject = function getSimilarObject (referenceMap, origin) {
  if (origin.index === 0) {
    return referenceMap[0]
  }

  var useArray = Array.isArray(origin.original)
  var originKeys = (0, _objects.objectKeys)(origin.object).filter(function (key) {
    return !origin.references.includes(key) && !(0, _objects.isObject)(origin.object[key])
  })
  var originValues = originKeys.map(function (key) {
    return origin.object[key]
  })
  return referenceMap.find(function (existing) {
    if (Array.isArray(existing.original) !== useArray) {
      return false
    }

    if (existing.original === origin.original) {
      return true
    }

    if (!originKeys.length) {
      return existing.index === origin.index
    }

    var existingKeys = (0, _objects.objectKeys)(existing.object).filter(function (key) {
      return !existing.references.includes(key) && !(0, _objects.isObject)(existing.object[key])
    })
    var existingValues = existingKeys.map(function (key) {
      return existing.object[key]
    })
    var compareResults = (0, _arrays.compareArrays)(existingValues, originValues)
    return compareResults.every(function (compare) {
      return compare.result.every(function (result) {
        return result === 0
      })
    })
  })
}

exports.getSimilarObject = getSimilarObject

var createReferenceReplica = function createReferenceReplica (firstMap, secondMap) {
  return function (newIndex, origin) {
    var referers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : []
    var defaultObject = Array.isArray(origin.original) ? [] : {}
    var nextFirstRef = (0, _cloneHelpers.createReferenceIdentifier)(defaultObject, newIndex, referers)
    nextFirstRef.complete = origin.complete
    nextFirstRef.merged = origin.merged
    nextFirstRef.object = defaultObject
    nextFirstRef.circular = origin.circular.map(function (key) {
      return key
    })
    nextFirstRef.original = origin.original
    var refLocation = firstMap.length
    firstMap.push(nextFirstRef)
    nextFirstRef.object = (0, _objects.objectKeys)(origin.object).reduce(function (newObj, key) {
      if (origin.references.includes(key) && !nextFirstRef.references.includes(key)) {
        nextFirstRef.references.push(key)
      }

      if (!origin.circular.includes(key)) {
        return (0, _objects.setValue)(key, origin.object[key], newObj)
      }

      var nextOrigin = (0, _cloneHelpers.findReference)(secondMap, origin.object[key])
      var matchedReference = getSimilarObject(firstMap, nextOrigin)
      var exists = typeof matchedReference !== 'undefined'
      var nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1

      if (!exists) {
        matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
      }

      if (!matchedReference.referers.includes(newIndex)) {
        matchedReference.referers.push(newIndex)
      }

      return (0, _objects.setValue)(key, nextNewIndex, newObj)
    }, nextFirstRef.object)
    nextFirstRef.object = nextFirstRef.references.reduce(function (newObj, key) {
      if (origin.circular.includes(key)) {
        return newObj
      }

      var nextOrigin = (0, _cloneHelpers.findReference)(secondMap, origin.object[key])
      var matchedReference = getSimilarObject(firstMap, nextOrigin)
      var exists = typeof matchedReference !== 'undefined'
      var nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1

      if (!exists) {
        matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
      }

      if (!matchedReference.referers.includes(newIndex)) {
        matchedReference.referers.push(newIndex)
      }

      newObj[key] = nextNewIndex

      if (nextNewIndex <= nextFirstRef.index) {
        nextFirstRef.circular.push(key)
      }

      return newObj
    }, nextFirstRef.object)

    if (origin.referers.length !== nextFirstRef.referers.length) {
      var newReferers = origin.referers.map(function (index) {
        var nextOrigin = (0, _cloneHelpers.findReference)(secondMap, index)
        var testMap = nextFirstRef.referers.map(function (refererIndex) {
          return (0, _cloneHelpers.findReference)(firstMap, refererIndex)
        })
        var matchedReference = getSimilarObject(testMap, nextOrigin)

        if (typeof matchedReference !== 'undefined') {
          return matchedReference.index
        }

        matchedReference = getSimilarObject(firstMap, nextOrigin)
        var exists = typeof matchedReference !== 'undefined'
        var nextNewIndex = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1

        if (!exists) {
          matchedReference = createReferenceReplica(firstMap, secondMap)(nextNewIndex, nextOrigin)
        }

        return matchedReference.index
      })
      var removeFunc = (0, _cloneHelpers.removeFromReferenceMap)(firstMap)
      nextFirstRef.referers.forEach(function (refererIndex) {
        return removeFunc((0, _cloneHelpers.findReference)(firstMap, refererIndex))
      })
      nextFirstRef.referers = newReferers
    }

    nextFirstRef.referers = (0, _arrays.uniqueArray)(nextFirstRef.referers)
    return firstMap[refLocation]
  }
}
/**
 * Take two reference identifiers and merge the non references together, identify overwritten references.
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {number} firstIndex
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {number} secondIndex
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} remove
 * @returns {module:cloneHelpers~referenceMap}
 */

exports.createReferenceReplica = createReferenceReplica

var mergeNonReferences = function mergeNonReferences (firstMap, firstIndex, secondMap, secondIndex) {
  var remove = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : []
  var firstRefIndex = (0, _cloneHelpers.findReferenceIndex)(firstMap, firstIndex)
  var secondRefIndex = (0, _cloneHelpers.findReferenceIndex)(secondMap, secondIndex)

  if (firstRefIndex < 0) {
    secondMap[secondRefIndex].complete = true
    secondMap[secondRefIndex].merged = true
    return (0, _objects.mapObject)(secondMap[secondRefIndex].object, function (value) {
      return value
    })
  }

  if (secondRefIndex < 0) {
    firstMap[firstRefIndex].complete = true
    firstMap[firstRefIndex].merged = true
    return firstMap[firstRefIndex].object
  }

  if (firstMap[firstRefIndex].merged && secondMap[secondRefIndex].merged) {
    return firstMap[firstRefIndex].object
  }

  firstMap[firstRefIndex].complete = true
  firstMap[firstRefIndex].merged = true
  secondMap[secondRefIndex].complete = true
  secondMap[secondRefIndex].merged = true
  var useArray = Array.isArray(firstMap[firstRefIndex].object)
  var keys = useArray ? (0, _arrays.compareArrays)(firstMap[firstRefIndex].object, secondMap[secondRefIndex].object) : (0, _arrays.compareArrays)((0, _objects.objectKeys)(firstMap[firstRefIndex].object), (0, _objects.objectKeys)(secondMap[secondRefIndex].object))
  firstMap[firstRefIndex].object = keys.reduce(function (newObject, compareResult, i) {
    var refIndexFirst = useArray ? firstMap[firstRefIndex].references.findIndex(function (refKey) {
      return compareResult.keys[0].includes(refKey)
    }) : firstMap[firstRefIndex].references.findIndex(function (refKey) {
      return refKey === compareResult.value
    })
    var nextKey = useArray ? i : compareResult.value
    var nextFirstValue = useArray ? firstMap[firstRefIndex].object[compareResult.keys[0][0]] : firstMap[firstRefIndex].object[compareResult.value]
    var nextSecondValue = useArray ? secondMap[secondRefIndex].object[compareResult.keys[1][0]] : secondMap[secondRefIndex].object[compareResult.value]

    if (compareResult.result[0] === 1) {
      if (refIndexFirst >= 0) {
        var refUnchanged = (0, _cloneHelpers.findReferenceIndex)(firstMap, nextFirstValue)

        if (firstMap[refUnchanged].merged === false) {
          firstMap[refUnchanged].complete = true
          firstMap[refUnchanged].merged = true
        }
      }

      return (0, _objects.setValue)(nextKey, nextFirstValue, newObject)
    }

    var refIndexSecond = useArray ? secondMap[secondRefIndex].references.findIndex(function (refKey) {
      return compareResult.keys[1].includes(refKey)
    }) : secondMap[secondRefIndex].references.findIndex(function (refKey) {
      return refKey === compareResult.value
    })
    var newValue = nextSecondValue

    if (refIndexSecond >= 0 && refIndexFirst < 0) {
      var nextSecondRef = (0, _cloneHelpers.findReference)(secondMap, nextSecondValue)
      var matchedReference = getSimilarObject(firstMap, nextSecondRef)
      var exists = typeof matchedReference !== 'undefined'
      newValue = exists ? matchedReference.index : firstMap[firstMap.length - 1].index + 1

      if (!exists) {
        matchedReference = createReferenceReplica(firstMap, secondMap)(newValue, nextSecondRef, [firstIndex])
      }

      if (!useArray && !firstMap[firstRefIndex].references.includes(nextKey)) {
        firstMap[firstRefIndex].references.push(nextKey)
        firstMap[firstRefIndex].object[nextKey] = newValue
      }

      if (useArray && !firstMap[firstRefIndex].object.includes(newValue)) {
        firstMap[firstRefIndex].references.push(firstMap[firstRefIndex].object.length)
        firstMap[firstRefIndex].object.push(newValue)
      }

      if (exists) {
        return newObject
      }

      nextFirstValue = newValue
      nextSecondRef.complete = true
      nextSecondRef.merged = true
    }

    if (compareResult.result[0] === -1) {
      if (useArray) {
        newObject.push(newValue)
        return newObject
      }

      return (0, _objects.setValue)(nextKey, newValue, newObject)
    }

    if (refIndexFirst < 0) {
      return refIndexSecond < 0 ? (0, _objects.setValue)(nextKey, nextSecondValue, newObject) : (0, _objects.setValue)(nextKey, nextFirstValue, newObject)
    }

    if (refIndexSecond >= 0) {
      return (0, _objects.setValue)(nextKey, nextFirstValue, newObject)
    }

    if (compareResult.result[0] === 0 && refIndexSecond < 0 && (0, _objects.emptyObject)(nextSecondValue)) {
      return (0, _objects.setValue)(nextKey, nextFirstValue, newObject)
    }

    var removedRef = (0, _cloneHelpers.findReference)(firstMap, nextFirstValue)
    var refererIndex = removedRef.referers.findIndex(function (referer) {
      return referer === firstIndex
    })

    if (refererIndex >= 0) {
      removedRef.referers.splice(refererIndex, 1)
    }

    remove.push(removedRef)
    firstMap[firstRefIndex].references.splice(refIndexFirst, 1)
    return (0, _objects.setValue)(nextKey, nextSecondValue, newObject)
  }, useArray ? [] : {})
  return firstMap[firstRefIndex].object
}
/**
 * Remove duplicate references from and array of references
 * @param {Array.<string|number|Array>} newRefs
 * @param {string|number|Array} ref
 * @returns {Array.<string|number|Array>}
 */

exports.mergeNonReferences = mergeNonReferences

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
 * Used as callback for reduce-like for-loop, this function will find each reference identifier
 * in object1 and merge object2 similar reference onto object1. object1 will then be returned.
 * @typedef {Function} mergeReferencesReduce
 * @param {module:cloneHelpers~objectReferencesRemove} object1
 * @param {number|string} key
 * @param {number} i
 * @returns {module:cloneHelpers~objectReferencesRemove}
 */

/**
 * Return the mergeReferencesReduce callback.
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {module:cloneHelpers~objectReferencesRemove} object2
 * @returns {module:mergeHelpers~mergeReferencesReduce}
 */

exports.mergeReferenceArrays = mergeReferenceArrays

var mergeReferenceObject = function mergeReferenceObject (firstMap, secondMap, object2) {
  return function (object1, key, i) {
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
      var nextFirstObject = object1.object[keyArray[0]]
      var nextSecondObject = object2.object[keyArray[0]]

      if (typeof nextFirstObject === 'number') {
        object1.index = nextFirstObject
        nextFirstObject = (0, _cloneHelpers.findReference)(firstMap, nextFirstObject).object
      }

      if (typeof nextSecondObject === 'number') {
        object2.index = nextSecondObject
        nextSecondObject = (0, _cloneHelpers.findReference)(secondMap, nextSecondObject).object
      }

      var references = keyArray[1].map(function (ref) {
        return ref
      })
      var firstRefs = keyArray[1]
      var secondRefs = keyArray[1].map(function (ref) {
        return ref
      })
      var newObj1 = (0, _cloneHelpers.objectAndReferences)(nextFirstObject, firstRefs, object1.index)
      var newObj2 = (0, _cloneHelpers.objectAndReferences)(nextSecondObject, secondRefs, object2.index)

      var _loop = function _loop (j) {
        var nextKey = references[j]
        var position = keyArray[1].findIndex(function (ref) {
          return ref === nextKey
        })
        mergeReferenceObject(firstMap, secondMap, newObj2)(newObj1, nextKey, position)
        key[1] = newObj1.references
      }

      for (var j in references) {
        _loop(j)
      }

      object1.remove = [].concat(_toConsumableArray(object1.remove), _toConsumableArray(newObj1.remove))
      return object1
    }

    var nextFirstIndex = object1.object[key]
    var nextSecondIndex = object2.object[key]

    if (typeof nextSecondIndex !== 'number') {
      if (typeof nextFirstIndex === 'number') {
        var nextFirstRefIndex = (0, _cloneHelpers.findReferenceIndex)(firstMap, nextFirstIndex)
        firstMap[nextFirstRefIndex].complete = true
        firstMap[nextFirstRefIndex].merged = true
      }

      return object1
    }

    var nextSecondRef = (0, _cloneHelpers.findReference)(secondMap, nextSecondIndex)

    if (typeof nextSecondRef === 'undefined') {
      return object1
    }

    if (typeof nextSecondRef.merged === 'undefined') {
      return object1
    }

    var nextFirstRef = typeof nextFirstIndex === 'number' ? (0, _cloneHelpers.findReference)(firstMap, nextFirstIndex) : null

    if (typeof nextFirstIndex !== 'number') {
      nextFirstRef = getSimilarObject(firstMap, nextSecondRef)
      var exists = typeof nextFirstRef !== 'undefined'
      nextFirstIndex = exists ? nextFirstRef.index : firstMap[firstMap.length - 1].index + 1

      if (!exists) {
        nextFirstRef = createReferenceReplica(firstMap, secondMap)(nextFirstIndex, nextSecondRef, [object1.index])
      }

      if (!object1.references.includes(key)) {
        object1.references.push(key)
        object1.object[key] = nextFirstIndex
      }
    }

    nextSecondRef.complete = true
    nextSecondRef.merged = true

    if (typeof nextFirstRef.merged === 'undefined') {
      return object1
    }

    object1.object[key] = mergeNonReferences(firstMap, nextFirstRef.index, secondMap, nextSecondRef.index, object1.remove)
    var removeFirstReferer = nextFirstRef.referers.findIndex(function (i) {
      return i === object1.index
    })
    nextFirstRef.referers.splice(removeFirstReferer, 1)
    var nextFirstReferences = nextFirstRef.references.map(function (ref) {
      return nextFirstRef.circular.includes(ref) ? [ref, null] : ref
    })
    object1.remove.push(nextFirstRef)
    var firstTrueIndex = (0, _cloneHelpers.findReferenceIndex)(firstMap, nextFirstIndex)
    firstMap[firstTrueIndex] = nextFirstRef

    if (nextFirstReferences.length && !isCircular) {
      object1.references[i] = [key, nextFirstReferences]
      object1.references = object1.references.reduce(mergeReferenceArrays, [])
      return object1
    }

    object1.references.splice(i, 1)
    return object1
  }
}
/**
 * Find each of the unlinked references and assign the newly cloned reference for each.
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @returns {module:cloneHelpers~referenceMap}
 */

exports.mergeReferenceObject = mergeReferenceObject

var mergeReferences = function mergeReferences (firstMap, secondMap) {
  if (typeof firstMap[0].merged === 'undefined' || typeof secondMap[0].merged === 'undefined') {
    return firstMap
  }

  var remove = []
  firstMap[0].object = mergeNonReferences(firstMap, 0, secondMap, 0, remove)
  var objRefs = (0, _arrays.mergeArrays)(firstMap[0].references, secondMap[0].references)
  objRefs = objRefs.reduce(mergeReferenceArrays, [])
  var object1 = (0, _cloneHelpers.objectAndReferences)(firstMap[0].object, objRefs, 0)
  var object2 = (0, _cloneHelpers.objectAndReferences)(secondMap[0].object, secondMap[0].references, 0)
  var references = objRefs.map(function (ref) {
    return ref
  })

  var _loop2 = function _loop2 (i) {
    var key = references[i]
    var position = firstMap[0].references.findIndex(function (ref) {
      return ref === key
    })
    mergeReferenceObject(firstMap, secondMap, object2)(object1, key, position)
    firstMap[0].references = object1.references
  }

  for (var i in references) {
    _loop2(i)
  }

  remove = [].concat(_toConsumableArray(remove), _toConsumableArray(object1.remove))
  var removeFunc = (0, _cloneHelpers.removeFromReferenceMap)(firstMap)
  var removeStatus = remove.reduce(function (status, ref) {
    var result = removeFunc(ref)
    return status ? result : status
  }, true)

  if (removeStatus) {
    firstMap = (0, _cloneHelpers.linkReferences)(firstMap)
  }

  if (removeStatus) {
    if (firstMap.length === 1) {
      secondMap.map(function (ref) {
        ref.complete = true
        ref.merged = true
        return ref
      })
    }
  }

  if (secondMap.every(function (ref) {
    return ref.merged
  })) {
    secondMap = (0, _cloneHelpers.linkReferences)(secondMap)
  }

  if (firstMap.every(function (ref) {
    return ref.merged
  }) && firstMap[0].references.length) {
    return mergeReferences(firstMap, secondMap)
  }

  return hasUnmergedReferences(firstMap) || hasUnmergedReferences(secondMap) ? mergeReferences(firstMap, secondMap) : firstMap
}
/**
 * Bundle all of the functions needed for processing an identifier in the reference map
 * @function
 * @param {module:cloneHelpers~referenceMap} firstMap
 * @param {module:cloneHelpers~referenceMap} secondMap
 * @param {Array.<module:cloneHelpers~referenceIdentifier>} moreReferences
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {Array.<module:cloneHelpers~referenceIdentifier>}
 */

exports.mergeReferences = mergeReferences

var processMergeIdentifer = function processMergeIdentifer (mapDetails) {
  return function (focusId) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    var _ref$mapLimit = _ref.mapLimit
    var mapLimit = _ref$mapLimit === void 0 ? 100 : _ref$mapLimit
    var _ref$depthLimit = _ref.depthLimit
    var depthLimit = _ref$depthLimit === void 0 ? -1 : _ref$depthLimit

    if (!mapDetails[focusId].moreReferences.length) {
      return mapDetails[focusId].moreReferences
    }

    var currentIndex = 0
    var isMaxDepth = false
    mapDetails[focusId].referenceMap = (0, _functions.pipe)(function (identifier) {
      return (0, _cloneHelpers.findReferenceIndex)(mapDetails[focusId].referenceMap, identifier.index)
    }, function (index) {
      currentIndex = index
      return (0, _cloneHelpers.findObjectReferences)(mapDetails[focusId].referenceMap[currentIndex])
    }, function (identifier) {
      return (0, _cloneHelpers.getIdentifierDepth)(mapDetails[focusId].referenceMap, identifier)
    }, function (currentDepth) {
      return currentDepth === depthLimit
    }, function (maxDepth) {
      isMaxDepth = maxDepth
      return (0, _cloneHelpers.findReferenceKeys)(mapDetails[focusId].referenceMap, currentIndex, isMaxDepth)
    }, function (identifier) {
      if (isMaxDepth) {
        mapDetails[focusId].referenceMap[currentIndex].references = identifier.circular
      }

      mapDetails[focusId].referenceMap[currentIndex].merged = false
      var references = mapDetails[focusId].referenceMap[currentIndex].references.filter(function (refKey) {
        return !identifier.circular.includes(refKey)
      })
      mapDetails[focusId].moreReferences = [].concat(_toConsumableArray(mapDetails[focusId].moreReferences), _toConsumableArray(references.map(function (key) {
        return mapDetails[focusId].referenceMap[identifier.object[key]]
      })))
      return mapDetails[focusId].referenceMap.length >= mapLimit
    }, function (maxLimit) {
      return maxLimit ? mergeReferences(mapDetails[0].referenceMap, mapDetails[1].referenceMap) : mapDetails[focusId].referenceMap
    })(mapDetails[focusId].moreReferences.shift())
    return mapDetails[focusId].moreReferences
  }
}
/**
 * Loop over every identifier and process, then return the reference map.
 * @param {Array|Object} object
 * @param {Object} [options={}]
 * @param {number} [options.mapLimit=100]
 * @param {depthLimit} [options.depthLimit=-1]
 * @returns {module:cloneHelpers~referenceMap}
 */

exports.processMergeIdentifer = processMergeIdentifer

var processMergeIdentifiers = function processMergeIdentifiers (firstObject, secondObject) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}
  var _ref2$mapLimit = _ref2.mapLimit
  var mapLimit = _ref2$mapLimit === void 0 ? 100 : _ref2$mapLimit
  var _ref2$depthLimit = _ref2.depthLimit
  var depthLimit = _ref2$depthLimit === void 0 ? -1 : _ref2$depthLimit

  var firstMap = [(0, _cloneHelpers.createReferenceIdentifier)(firstObject, 0)]
  var secondMap = [(0, _cloneHelpers.createReferenceIdentifier)(secondObject, 0)]
  var mapDetails = [{
    referenceMap: firstMap,
    moreReferences: [firstMap[0]]
  }, {
    referenceMap: secondMap,
    moreReferences: [secondMap[0]]
  }]

  do {
    mapDetails[0].moreReferences = processMergeIdentifer(mapDetails)(0, {
      mapLimit: mapLimit,
      depthLimit: depthLimit
    })
    mapDetails[1].moreReferences = processMergeIdentifer(mapDetails)(1, {
      mapLimit: mapLimit,
      depthLimit: depthLimit
    })
  } while (mapDetails[0].moreReferences.length > 0 || mapDetails[1].moreReferences.length > 0)

  return [firstMap, secondMap]
}

exports.processMergeIdentifiers = processMergeIdentifiers
