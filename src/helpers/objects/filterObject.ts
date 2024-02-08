import 'core-js/stable'
import callWithParams from '../functions/callWithParams'
import objectKeys from './objectKeys'

type filterableItem = Array<any> | {
  [k: number | string] : any
}

/**
 * Function is a predicate, to test each property value of the object. Return true to keep the element, false
 * otherwise, taking three arguments
 * @callback module:objectHelpers~filterCallback
 * @memberOf module:objectHelpers
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object filter was called upon.
 * @returns {boolean}
 */
type filterCallback = (currentProperty: any, currentIndex: keyof filterableItem, object: filterableItem) => boolean

/**
 * This function is intended to replicate behaviour of the Array.filter() function but for Objects.
 * If an array is passed in instead then it will perform standard filter(). It is recommended to
 * always use the standard filter() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~filterCallback|Function} fn - The function to be processed for each filtered property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const filterObject = (obj: filterableItem, fn: filterCallback, thisArg: filterableItem = undefined): filterableItem => Array.isArray(obj)
  ? obj.filter(fn, thisArg)
  : objectKeys(obj, true).reduce((newObj, curr) => {
    if (callWithParams(fn.bind(thisArg), [obj[curr], curr, obj], 2)) {
      newObj[curr] = obj[curr]
    } else {
      delete newObj[curr]
    }
    return newObj
  }, {})

export default filterObject
