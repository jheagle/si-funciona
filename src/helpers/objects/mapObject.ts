import callWithParams from '../functions/callWithParams'
import objectKeys from './objectKeys'
import setValue from './setValue'

type mappableItem = Array<any> | {
  [k: number | string] : any
}

type mapCallback = (currentProperty: any, currentIndex: keyof mappableItem, object: mappableItem) => any

/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be mapped
 * @param fn - The function to be processed for each mapped property
 * @param thisArg - Optional. Value to use as this when executing callback.
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
