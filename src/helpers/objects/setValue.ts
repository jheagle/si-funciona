
type settableItem = Array<any> | {
  [k: number | string]: any
}

/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @param key - The key on the item which will have its value set
 * @param value - Any value to be applied to the key
 * @param item - An object or array to be updated
 */
const setValue = (key: number | string, value: any, item: settableItem): settableItem => {
  // @ts-ignore
  item[key] = value
  return item
}

export default setValue
