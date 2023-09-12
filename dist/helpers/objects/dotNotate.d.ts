import 'core-js/stable';
export type dotNotateableItem = Array<any> | {
    [k: string]: any;
};
/**
 * A string representing the full-path to a property in an object. Each depth of the path is separated by a period.
 * @example 'a.b.c'
 * @typedef {string} DotNotationString
 * @memberOf module:objectHelpers
 */
export type dotNotationString = string;
/**
 * An array or object where all properties have been flatted and keyed by a dot-notated string.
 * @typedef {Object.<DotNotationString, *>} DotNotatedObject
 * @memberOf module:objectHelpers
 */
type dotNotatedObject = {
    [k: dotNotationString]: any;
};
/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to dot-notate
 * @param {Array.<DotNotationString>} [retainObjects=[]] - An array of keys to retain as objects
 * @returns {DotNotatedObject} The dot-notated object
 */
declare const dotNotate: (arrayObject: object, retainObjects?: Array<dotNotationString>) => dotNotatedObject;
export default dotNotate;
