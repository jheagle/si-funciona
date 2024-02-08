import 'core-js/stable';
import { dotNotateableItem, dotNotationString } from './dotNotate';
/**
 * Unset a nested property value an object.
 * @memberOf module:objectHelpers
 * @param {Object} arrayObject - The array or object to set the property on
 * @param {string} dotNotation - The path for the property
 * @returns {Object} The modified object
 */
declare const dotUnset: (arrayObject: dotNotateableItem, dotNotation: dotNotationString) => dotNotateableItem;
export default dotUnset;
