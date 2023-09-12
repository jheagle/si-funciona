import 'core-js/stable'

type settableItem = Array<any> | {
  [k: number | string]: any
}

/**
 * Set a value on an item, then return the value
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} item - An object or array to be updated
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @returns {*}
 */
const setAndReturnValue = (item: settableItem, key: keyof settableItem, value: any): any => {
  item[key] = value
  return value
}

export default setAndReturnValue
