import 'core-js/stable'
import callWithParams from '../functions/callWithParams'
import objectKeys from './objectKeys'
import setValue from './setValue'

type mappableItem = Array<any> | {
  [k: number | string] : any
}

/**
 * Function that produces a property of the new Object, taking three arguments
 * @callback module:objectHelpers~mapCallback
 * @memberOf module:objectHelpers
 * @param {*} currentProperty - The current property being processed in the object.
 * @param {string} [currentIndex] - The property name of the current property being processed in the object.
 * @param {Object|Array} [object] - The object map was called upon.
 * @returns {*}
 */
type mapCallback = (currentProperty: any, currentIndex: keyof mappableItem, object: mappableItem) => any

/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be mapped
 * @param {module:objectHelpers~mapCallback|Function} fn - The function to be processed for each mapped property
 * @param {Object|Array} [thisArg] - Optional. Value to use as this when executing callback.
 * @returns {Object|Array}
 */
const mapObject = (obj: mappableItem, fn: mapCallback, thisArg: mappableItem = undefined): mappableItem => Array.isArray(obj)
  ? obj.map(fn, thisArg)
  : objectKeys(obj, true).reduce(
    (newObj, curr) => setValue(
      curr,
      callWithParams(fn.bind(thisArg), [obj[curr], curr, obj], 2),
      newObj
    ),
    {}
  )

export default mapObject
