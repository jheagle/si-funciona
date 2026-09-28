import { dotNotateableItem, dotNotationString } from './dotNotate';
/**
 * Get a nested property value from an object.
 * @param arrayObject - The array or object to get the property from
 * @param dotNotation - The path to the property
 * @param defaultValue - The default value to return if the property is not found
 * @returns The value of the property
 */
declare const dotGet: (arrayObject: dotNotateableItem, dotNotation: dotNotationString, defaultValue?: string | null) => any;
export default dotGet;
//# sourceMappingURL=dotGet.d.ts.map