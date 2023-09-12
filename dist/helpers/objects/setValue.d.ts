import 'core-js/stable';
type settableItem = Array<any> | {
    [k: number | string]: any;
};
/**
 * Set a value on an item, then return the item.
 * NOTE: Argument order designed for usage with pipe
 * @function
 * @memberOf module:objectHelpers
 * @param {string|number} key - The key on the item which will have its value set
 * @param {*} value - Any value to be applied to the key
 * @param {Object|Array} item - An object or array to be updated
 * @returns {Object|Array}
 */
declare const setValue: (key: number | string, value: any, item: settableItem) => settableItem;
export default setValue;
