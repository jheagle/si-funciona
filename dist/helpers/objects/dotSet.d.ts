import 'core-js/stable';
import { dotNotateableItem, dotNotationString } from './dotNotate';
/**
 * Set a nested property value an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @param {*} value - The default value to return if the property is not found
 * @returns {Object} The modified object
 */
declare const dotSet: (arrayObject: dotNotateableItem, dotNotation: dotNotationString, value?: any) => dotNotateableItem;
export default dotSet;
