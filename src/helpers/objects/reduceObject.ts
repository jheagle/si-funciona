import 'core-js/stable'
import callWithParams from '../functions/callWithParams'
import objectKeys from './objectKeys'

type reduceableItem = Array<any> | {
  [k: number | string] : any
}

/**
 * Function to execute on each property in the object, taking four arguments
 * @callback module:objectHelpers~reduceCallback
 * @memberOf module:objectHelpers
 * @param {*} [accumulator={}] - The accumulator accumulates the callback's return values; it is the accumulated
 * value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
 * @param {*} [currentProperty={}] - The current property being processed in the object.
 * @param {string} [currentIndex=0] - The index of the current element being processed in the array. Starts at index
 * 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {Object|Array} [object={}] - The object reduce was called upon.
 * @returns {*}
 */
type reduceCallback = (accumulator: any, currentProperty: any, currentIndex: keyof reduceableItem, object: reduceableItem) => any

/**
 * This function is intended to replicate behaviour of the Array.reduce() function but for Objects.
 * If an array is passed in instead then it will perform standard reduce(). It is recommended to
 * always use the standard reduce() function when it is known that the object is actually an array.
 * @memberOf module:objectHelpers
 * @param {Object|Array} obj - The Object (or Array) to be filtered
 * @param {module:objectHelpers~reduceCallback|Function|reduceCallback} fn - The function to be processed for each filtered property
 * @param {Object|Array} [initialValue] - Optional. Value to use as the first argument to the first call of the
 * callback. If no initial value is supplied, the first element in the array will be used. Calling reduce on an empty
 * array without an initial value is an error.
 * @returns {*}
 */
const reduceObject = (obj: reduceableItem, fn: reduceCallback, initialValue: reduceableItem = obj[objectKeys(obj)[0]] || obj[0]): any => Array.isArray(obj)
  ? obj.reduce(fn, initialValue)
  : objectKeys(obj, true).reduce(
    (newObj: Array<any> | Object, curr: number | string): any => callWithParams(fn, [newObj, obj[curr], curr, obj], 2),
    initialValue
  )

export default reduceObject
