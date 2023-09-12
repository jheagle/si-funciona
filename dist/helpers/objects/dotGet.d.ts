import 'core-js/stable';
import { dotNotateableItem, dotNotationString } from './dotNotate';
/**
 * Get a nested property value from an object.
 * @function
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to get the property from
 * @param {string} dotNotation - The path to the property
 * @param {string|null} [defaultValue=null] - The default value to return if the property is not found
 * @returns {*} The value of the property
 */
declare const dotGet: (arrayObject: dotNotateableItem, dotNotation: dotNotationString, defaultValue?: string | null) => any;
export default dotGet;
