type mappableItem = Array<any> | {
    [k: number | string]: any;
};
type mapCallback = (currentProperty: any, currentIndex: keyof mappableItem, object: mappableItem) => any;
/**
 * This function is intended to replicate behaviour of the Array.map() function but for Objects.
 * If an array is passed in instead then it will perform standard map(). It is recommended to
 * always use the standard map() function when it is known that the object is actually an array.
 * @param obj - The Object (or Array) to be mapped
 * @param fn - The function to be processed for each mapped property
 * @param thisArg - Optional. Value to use as this when executing callback.
 */
declare const mapObject: (obj: mappableItem, fn: mapCallback, thisArg?: mappableItem) => mappableItem;
export default mapObject;
//# sourceMappingURL=mapObject.d.ts.map