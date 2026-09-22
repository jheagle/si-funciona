
const sameValueZero = (first: any, second: any): boolean => first === second || (first !== first && second !== second)

const compare = (first: any, second: any, seen: WeakMap<object, WeakSet<object>>): boolean => {
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
  const comparing: WeakSet<object> | undefined = seen.get(first)
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
    return first.size === second.size && Array.from(first.entries())
      .every(([key, value]: [any, any]): boolean => second.has(key) && compare(value, second.get(key), seen))
  }
  if (first instanceof Set) {
    const others: Array<any> = Array.from(second.values())
    return first.size === second.size && Array.from(first.values())
      .every((value: any): boolean => others.some((other: any): boolean => compare(value, other, seen)))
  }
  if (Array.isArray(first) && first.length !== second.length) {
    return false
  }
  const firstKeys: Array<string> = Object.keys(first)
  const secondKeys: Array<string> = Object.keys(second)
  return firstKeys.length === secondKeys.length && firstKeys.every((key: string): boolean =>
    Object.prototype.hasOwnProperty.call(second, key) && compare(first[key], second[key], seen))
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
const isEqual = (first: any, second: any): boolean => compare(first, second, new WeakMap())

export default isEqual
