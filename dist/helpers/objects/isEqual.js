'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/modules/es.regexp.flags.js')
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.every.js')
require('core-js/modules/esnext.iterator.some.js')
require('core-js/modules/esnext.map.delete-all.js')
require('core-js/modules/esnext.map.every.js')
require('core-js/modules/esnext.map.filter.js')
require('core-js/modules/esnext.map.find.js')
require('core-js/modules/esnext.map.find-key.js')
require('core-js/modules/esnext.map.includes.js')
require('core-js/modules/esnext.map.key-of.js')
require('core-js/modules/esnext.map.map-keys.js')
require('core-js/modules/esnext.map.map-values.js')
require('core-js/modules/esnext.map.merge.js')
require('core-js/modules/esnext.map.reduce.js')
require('core-js/modules/esnext.map.some.js')
require('core-js/modules/esnext.map.update.js')
require('core-js/modules/esnext.set.add-all.js')
require('core-js/modules/esnext.set.delete-all.js')
require('core-js/modules/esnext.set.difference.js')
require('core-js/modules/esnext.set.every.js')
require('core-js/modules/esnext.set.filter.js')
require('core-js/modules/esnext.set.find.js')
require('core-js/modules/esnext.set.intersection.js')
require('core-js/modules/esnext.set.is-disjoint-from.js')
require('core-js/modules/esnext.set.is-subset-of.js')
require('core-js/modules/esnext.set.is-superset-of.js')
require('core-js/modules/esnext.set.join.js')
require('core-js/modules/esnext.set.map.js')
require('core-js/modules/esnext.set.reduce.js')
require('core-js/modules/esnext.set.some.js')
require('core-js/modules/esnext.set.symmetric-difference.js')
require('core-js/modules/esnext.set.union.js')
require('core-js/modules/esnext.weak-map.delete-all.js')
require('core-js/modules/esnext.weak-set.add-all.js')
require('core-js/modules/esnext.weak-set.delete-all.js')
require('core-js/stable')
const sameValueZero = (first, second) => first === second || first !== first && second !== second
const compare = (first, second, seen) => {
  if (sameValueZero(first, second)) {
    return true
  }
  if (typeof first !== 'object' || typeof second !== 'object' || first === null || second === null) {
    // Different primitives, or a function (which is only equal to itself), or an object against a primitive
    return false
  }
  if (Object.getPrototypeOf(first) !== Object.getPrototypeOf(second)) {
    return false
  }
  // A pair which is already being compared further up is not a difference (this is what makes circular references work)
  const comparing = seen.get(first)
  if (comparing && comparing.has(second)) {
    return true
  }
  if (comparing) {
    comparing.add(second)
  } else {
    seen.set(first, new WeakSet([second]))
  }
  if (first instanceof Date) {
    return first.getTime() === second.getTime()
  }
  if (first instanceof RegExp) {
    return first.source === second.source && first.flags === second.flags
  }
  if (first instanceof Map) {
    return first.size === second.size && Array.from(first.entries()).every(([key, value]) => second.has(key) && compare(value, second.get(key), seen))
  }
  if (first instanceof Set) {
    const others = Array.from(second.values())
    return first.size === second.size && Array.from(first.values()).every(value => others.some(other => compare(value, other, seen)))
  }
  if (Array.isArray(first) && first.length !== second.length) {
    return false
  }
  const firstKeys = Object.keys(first)
  const secondKeys = Object.keys(second)
  return firstKeys.length === secondKeys.length && firstKeys.every(key => Object.prototype.hasOwnProperty.call(second, key) && compare(first[key], second[key], seen))
}
/**
 * Check whether two values are equal by value, however they are stored: two separately made arrays or objects with the
 * same contents are equal, while two references only need to be the same when the value is a function.
 * - Primitives are equal when they are the same value (and NaN equals NaN)
 * - Arrays are equal when they have the same elements in the same order
 * - Objects are equal when they have the same prototype (the same kind of object) and the same own properties with
 * equal values, the order of the properties does not matter
 * - Dates, regular expressions, Maps and Sets are compared by what they hold
 * - Circular references are handled: a pair of objects which is already being compared is taken to be equal
 * @memberOf module:objectHelpers
 * @param {*} first - The first value.
 * @param {*} second - The second value.
 * @returns {boolean} True when the values are equal.
 */
const isEqual = (first, second) => compare(first, second, new WeakMap())
const _default = exports.default = isEqual
