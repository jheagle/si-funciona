export type dotNotateableItem = Array<any> | {
    [k: string]: any;
};
export type dotNotationString = string;
type dotNotatedObject = {
    [k: dotNotationString]: any;
};
/**
 * Convert an array or object to a single dimensional associative array with dot notation.
 * @param arrayObject - The array or object to dot-notate
 * @param retainObjects - An array of keys to retain as objects
 * @returns The dot-notated object
 */
declare const dotNotate: (arrayObject: object, retainObjects?: Array<dotNotationString>) => dotNotatedObject;
export default dotNotate;
//# sourceMappingURL=dotNotate.d.ts.map