import 'core-js/stable';
type arrayObjectItem = Array<any> | {
    [k: number | string]: any;
};
/**
 * Get an array of values from any object or array. Will return empty array when invalid or there are no values.
 * Optional flag will include the inherited values from prototype chain when set.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object|Array} object
 * @param {boolean} [includeInherited=false]
 * @returns {Array}
 */
declare const objectValues: (object: arrayObjectItem, includeInherited?: boolean) => Array<any>;
export default objectValues;
